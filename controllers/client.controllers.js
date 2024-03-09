import { catchAsync } from '../utils/catchAsync.js';
import bcrypt from 'bcryptjs';
import { generateJWT } from '../utils/jwt.js';
import { AppError } from '../utils/AppError.js';
import { Client } from '../models/client.model.js';
import nodemailer from 'nodemailer';

export const findAll = catchAsync(async (req, res) => {
  const { email, name, phone, page } = req.query;
  const itemsPerPage = 20;

  const pageNumber = parseInt(page, 10);
  const offset = (pageNumber - 1) * itemsPerPage;

  const whereCondition = {};

  if (email) {
    whereCondition.email = email;
  }

  if (name) {
    whereCondition.name = name;
  }

  if (phone) {
    whereCondition.phoneNumber = phone;
  }

  const totalCount = await Client.count({
    where: whereCondition,
  });

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const clients = await Client.findAll({
    where: whereCondition,
    attributes: { exclude: ['password'] }, 
    order: [['createdAt', 'DESC']],
    offset,
    limit: itemsPerPage,
  });

  return res.status(200).json({
    status: 'success',
    results: clients.length,
    clients,
    totalPages,
    currentPage: pageNumber,
  });
});

export const findOne = catchAsync(async (req, res) => {
  const { client } = req;

  return res.status(200).json({
    status: 'success',
    client,
  });
});

export const signup = catchAsync(async (req, res) => {
  const { name, lastName, email, phoneNumber, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const currentDate = new Date();
  const validityDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Agregamos 30 días en milisegundos
  
  // Formatear la fecha de validez sin las horas
  const validityDateString = validityDate.toISOString().slice(0, 10);
  

  const client = await Client.create({
    name,
    lastName,
    email,
    phoneNumber,
    password: encryptedPassword,
    validity: validityDateString,
  });

  const token = await generateJWT(client.id);

  res.status(201).json({
    status: 'success',
    message: 'The client has been created successfully!',
    token,
    client,
  });
});



export const login = catchAsync(async (req, res, next) => {
  const { emailOrPhone, password } = req.body;

  // Busca el cliente por email
  const client = await Client.findOne({
    where: {
      email: emailOrPhone
    },
  });

  // Si no se encuentra el cliente por email, busca por número de teléfono
  if (!client) {
    const clientByPhone = await Client.findOne({
      where: {
        phoneNumber: emailOrPhone
      },
    });

    // Si no se encuentra el cliente por email ni por teléfono, devuelve un error
    if (!clientByPhone) {
      return next(new AppError('El correo o numero de telefono no estan  registrados', 404));
    }
  }

  // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
  const passwordMatch = await bcrypt.compare(password, client.password);

  // Si la contraseña no coincide, devuelve un error
  if (!passwordMatch) {
    return next(new AppError('Contraseña incorrecta, intente de nuevo', 401));
  }

  // Genera un token JWT
  const token = await generateJWT(client.id);

  // Envia una respuesta con el token y los datos del cliente
  res.status(200).json({
    status: 'success',
    token,
    client,
  });
});

export const update = catchAsync(async (req, res) => {
  const { client } = req;
  const { name, lastName } = req.body;

  await client.update({
    name,
    lastName,
  });

  return res.status(200).json({
    status: 'success',
    message: 'client information has been updated',
    client,
  });
});

const generateVerificationCode = () => {
  const min = 100000; // El mínimo valor de un número de 6 dígitos
  const max = 999999; // El máximo valor de un número de 6 dígitos
  const verificationCode = Math.floor(Math.random() * (max - min + 1)) + min;
  return verificationCode.toString(); // Convertir el número en una cadena
};

export const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;

  const client = await Client.findOne({
    where: {
      email,
    },
  });

  if (!client) {
    return res.status(404).json({
      status: 'error',
      message: 'No se encontró ningún usuario con este correo electrónico.',
    });
  }

  // Generar un código de verificación de 6 dígitos
  const verificationCode = generateVerificationCode();

  // Almacenar el código de verificación junto con el correo electrónico del usuario
  await client.update({
    verificationCode,
  });

  // Enviar el código de verificación al correo electrónico del usuario
  const transporter = nodemailer.createTransport({
    // Configuración de transporte de correo electrónico (por ejemplo, SMTP)
  });

  const mailOptions = {
    from: 'your-email@example.com',
    to: email,
    subject: 'Código de verificación para restablecer la contraseña',
    text: `Tu código de verificación es: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo electrónico:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Error al enviar el correo electrónico.',
      });
    } else {
      console.log('Correo electrónico enviado:', info.response);
      return res.status(200).json({
        status: 'success',
        message: 'Se ha enviado un código de verificación a tu correo electrónico.',
      });
    }
  });
});

export const verificationCode = catchAsync(async (req, res) => {
  const { client } = req;
  const { code } = req.body;

  if (code === client.verificationCode) {
    return res.status(200).json({
      status: 'success',
      message: 'Password updated successfully.',
      client,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Error codigo incorrecto',
  });
});

export const newPassword = catchAsync(async (req, res) => {
  const { client } = req;
  const { newPassword } = req.body;

  // Generar un nuevo hash para la nueva contraseña
  const salt = await bcrypt.genSalt(12);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);

  // Actualizar la contraseña en la base de datos
  await client.update({
    password: hashedNewPassword,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Password updated successfully.',
    client,
  });
});

export const deleteClient = catchAsync(async (req, res) => {
  const { client } = req;

  await client.update({
    status: 'disabled',
  });

  return res.status(200).json({
    status: 'success',
    message: `The client with id: ${client.id} has been deleted`,
  });
});
