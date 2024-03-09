import { DataTypes, Sequelize } from 'sequelize';
import { db } from '../config/database.config.js';

const User = db.define('user', {
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
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin'),
    allowNull: true,
    defaultValue: 'admin',
  },
});

export { User };
