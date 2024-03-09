import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { Mtc } from '../models/mtc.model.js';

export const validExistConsultation = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const consultation = await Mtc.findOne({
    where: {
      id,
    },
  });

  if (!consultation) {
    return next(new AppError(`consultation with id: ${id} not found `, 404));
  }

  req.consultation = consultation;
  next();
});
