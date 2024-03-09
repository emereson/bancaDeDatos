import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { Client } from '../models/client.model.js';

export const validExistClient = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const client = await Client.findOne({
    where: {
      id,
    },
  });

  if (!client) {
    return next(new AppError(`client with id: ${id} not found `, 404));
  }

  req.client = client;

  next();
});
