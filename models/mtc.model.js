import { DataTypes } from 'sequelize';
import { db } from '../config/database.config.js';

const Mtc = db.define('mtc', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  dni: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  licencias: {
    type: DataTypes.ARRAY(DataTypes.JSONB), // Especifica el tipo de datos dentro del array como JSONB
    allowNull: false,
    defaultValue: [], // Valor por defecto: un array vacío
  },
});

export { Mtc };
