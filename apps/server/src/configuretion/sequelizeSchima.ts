import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from './postgresql';
import { v4 as uuidv4 } from 'uuid';


export const Name = sequelize.define('Name', {
  name_name: { type: DataTypes.STRING, allowNull: true },
  age: { type: DataTypes.INTEGER, allowNull: true },
});

export const Cow = sequelize.define(
  'Cow',
  {
    caw_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    enter_date: {
      type: DataTypes.DATEONLY,
    },
    enter_time: {
      type: DataTypes.TIME,
    },
    caw_num: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stage: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    // Other model options go here
  }
);
