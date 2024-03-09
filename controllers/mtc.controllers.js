import { Mtc } from '../models/mtc.model.js';
import { catchAsync } from '../utils/catchAsync.js';

export const findAll = catchAsync(async (req, res) => {
  const queries = await Mtc.findAll({
    order: [['id', 'ASC']],
  });

  return res.status(200).json({
    status: 'success',
    results: queries.length,
    queries,
  });
});

export const findOne = catchAsync(async (req, res) => {
  const { consultation } = req;

  return res.status(200).json({
    status: 'success',
    consultation,
  });
});

export const create = catchAsync(async (req, res) => {
  const { dni, licencias, apPaterno, apMaterno } = req.body;
  console.log(licencias);

  const consultation = await Mtc.create({
    dni,
    licencias,
    apPaterno,
    apMaterno,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The consultation has been created',
    consultation,
  });
});

export const update = catchAsync(async (req, res) => {
  const { consultation } = req;
  const { carOrDni, typeConsultation, date, houre } = req.body;

  await consultation.update({
    carOrDni,
    typeConsultation,
    date,
    houre,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The  information consultation has been update',
    consultation,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { consultation } = req;

  await consultation.destroy();

  return res.status(200).json({
    status: 'success',
    message: 'consultation has been deleted',
    consultation,
  });
});
