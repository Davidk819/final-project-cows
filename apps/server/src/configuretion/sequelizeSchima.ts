import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from './postgresql';
import { v4 as uuidv4 } from 'uuid';


export const Name = sequelize.define('Name', {
  name_name: { type: DataTypes.STRING, allowNull: true },
  age: { type: DataTypes.INTEGER, allowNull: true },
});

export const Cow = sequelize.define(
  'cow',
  {
    caw_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    enter_date: {
      type: DataTypes.DATEONLY,
    },
    enter_time: {
      type: DataTypes.STRING,
    },
    caw_num: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stage: {
      
    }
  },
  {
    // Other model options go here
  }
);
export const createTable = async ()=>{
  try {
    await Cow.sync()
  } catch (error) {
    console.error(error);
  }
}