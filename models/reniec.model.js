import { DataTypes } from "sequelize";
import { db } from "../config/database.config.js";

const Reniec = db.define("reniec", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apePaterno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apeMaterno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  feNacimiento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departamento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  provicia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  distrito: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Reniec };
