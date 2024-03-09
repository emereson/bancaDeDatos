import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { Client } from '../models/client.model.js';

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in!, Please log in to get access', 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_JWT_SEED);

  const client = await Client.findOne({
    where: {
      id: decoded.id,
    },
  });

  if (!client) {
    return next(new AppError('The owner of this token is not longer available', 401));
  }

  if (client.passwordChangedAt) {
    const changedTimeStamp = parseInt(client.passwordChangedAt.getTime() / 1000, 10);

    if (decoded.iat < changedTimeStamp) {
      return next(new AppError('client recently changed password!, please login again.', 401));
    }
  }

  req.sessionClient = client;
  next();
});

export const protectAccountOwner = catchAsync(async (req, res, next) => {
  const { client, sessionClient } = req;

  if (client.id !== sessionClient.id) {
    return next(new AppError('You are not the owner of this account.', 401));
  }

  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionClient.role)) {
      return next(new AppError('You do not have permission to perform this action!', 403));
    }

    next();
  };
};
