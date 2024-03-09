import { User } from '../models/user.model.js';
import { catchAsync } from '../utils/catchAsync.js';
import bcrypt from 'bcryptjs';
import { generateJWT } from '../utils/jwt.js';
import { AppError } from '../utils/AppError.js'; // Asegúrate de importar AppError si no lo has hecho

export const findAll = catchAsync(async (req, res) => {
  const users = await User.findAll();

  return res.status(200).json({
    status: 'success',
    results: users.length,
    users,
  });
});

export const findOne = catchAsync(async (req, res) => {
  const { user } = req; // Asumo que tienes el usuario en req.user

  return res.status(200).json({
    status: 'success',
    user,
  });
});

export const signup = catchAsync(async (req, res) => {
  const { name, lastName, email, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    lastName,
    email,
    password: encryptedPassword,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'The user has been created successfully!',
    token,
    user,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return next(new AppError('El email no se encuentra registrado.', 404));
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return next(new AppError('contraseña  incorrecta.', 401));
  }

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    token,
    user,
  });
});

export const update = catchAsync(async (req, res) => {
  const { user } = req;
  const { name, lastName, dni, email, phoneNumber, address } = req.body;

  await user.update({
    name,
    lastName,
    dni,
    email,
    phoneNumber,
    address,
  });

  return res.status(200).json({
    status: 'success',
    message: 'User information has been updated',
    user,
  });
});

// update password
export const updatePassword = catchAsync(async (req, res) => {
  const { user } = req;
  const { currentPassword, newPassword } = req.body;

  // Verificar la contraseña actual del usuario
  const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      status: 'error',
      message: 'La contraseña actual es incorrecta.',
    });
  }

  // Generar un nuevo hash para la nueva contraseña
  const salt = await bcrypt.genSalt(12);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);

  // Actualizar la contraseña en la base de datos
  await user.update({
    password: hashedNewPassword,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Password updated successfully.',
    user,
  });
});

export const updateImg = catchAsync(async (req, res) => {
  const { user } = req;

  const imgRef = ref(storage, `userImg/${Date.now()}-${req.file.originalname}`);

  await uploadBytes(imgRef, req.file.buffer);

  const imgUploaded = await getDownloadURL(imgRef);

  await user.update({
    userImg: imgUploaded,
  });

  return res.status(200).json({
    status: 'success',
    message: 'User img has been updated',
    user,
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  const { user } = req;

  await user.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The user with id: ${user.id} has been deleted`,
  });
});
