import { Reniec } from "../models/reniec.model.js";
import { catchAsync } from "../utils/catchAsync.js";

export const findAll = catchAsync(async (req, res) => {
  const buyplans = await Reniec.findAll({
    order: [["id", "ASC"]],
  });

  return res.status(200).json({
    status: "success",
    results: buyplans.length,
    buyplans,
  });
});

export const findOne = catchAsync(async (req, res) => {
  const { buyplan } = req;

  return res.status(200).json({
    status: "success",
    buyplan,
  });
});

export const create = catchAsync(async (req, res) => {
  const { namePlan, numberQueries, days, pay, date } = req.body;
  const { id } = req.params;

  const buyPlan = await BuyPlan.create({
    clientId: id,
    namePlan,
    numberQueries,
    days,
    pay,
    date,
  });

  return res.status(200).json({
    status: "success",
    message: "The buyPlan has been created",
    buyPlan,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { buyPlan } = req;

  await buyPlan.destroy();

  return res.status(200).json({
    status: "success",
    message: "buyPlan has been deleted",
    buyPlan,
  });
});
