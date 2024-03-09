import { DataTypes } from 'sequelize';
import { db } from '../config/database.config.js';

const Plan = db.define('plan', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  namePlan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numberQueries: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  days: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  pay: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

export { Plan };
