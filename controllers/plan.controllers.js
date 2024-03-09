import { Plan } from '../models/plan.model.js';
import { catchAsync } from '../utils/catchAsync.js';

export const findAll = catchAsync(async (req, res) => {
  const plans = await Plan.findAll({
    order: [['id', 'ASC']],
  });

  return res.status(200).json({
    status: 'success',
    results: plans.length,
    plans,
  });
});

export const findOne = catchAsync(async (req, res) => {
  const { plan } = req;

  return res.status(200).json({
    status: 'success',
    plan,
  });
});

export const create = catchAsync(async (req, res) => {
  const { namePlan, numberQueries, days, pay, date } = req.body;

  const plan = await Plan.create({
    namePlan,
    numberQueries,
    days,
    pay,
    date,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The plan has been created',
    plan,
  });
});

export const update = catchAsync(async (req, res) => {
  const { plan } = req;
  const { namePlan, numberQueries, days, pay, date } = req.body;

  await plan.update({
    namePlan,
    numberQueries,
    days,
    pay,
    date,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The  information plan has been update',
    plan,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { plan } = req;

  await plan.destroy();

  return res.status(200).json({
    status: 'success',
    message: 'the plan has been deleted',
    plan,
  });
});
