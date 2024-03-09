import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { BuyPlan } from '../models/buyPlan.model.js';

export const validExistBuyPlan = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const buyPlan = await BuyPlan.findOne({
    where: {
      id,
    },
  });

  if (!buyPlan) {
    return next(new AppError(`buyPlan with id: ${id} not found `, 404));
  }

  req.buyPlan = buyPlan;

  next();
});
