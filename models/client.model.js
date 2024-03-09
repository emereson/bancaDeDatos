import { Sequelize, DataTypes } from 'sequelize';
import { db } from '../config/database.config.js';

const Client = db.define('client', {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  validity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  consultationsAvailable: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 30,
  },
  queriesMade: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  verificationCode:{
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:"0"
  }
});

export { Client };
