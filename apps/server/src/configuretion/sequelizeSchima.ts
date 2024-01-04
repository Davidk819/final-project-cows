import {  DataTypes } from 'sequelize';
import { sequelize } from './postgresql';
import {  Model } from 'sequelize';
import { CowAttributes } from '../typs';




interface CowInstance extends Model<CowAttributes>, CowAttributes {}



export const Cow = sequelize.define<CowInstance>(
  'cow',
  {
    cow_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    enter_date: {
      type: DataTypes.DATEONLY,
    },
    enter_time: {
      type: DataTypes.STRING,
    },
    cow_num: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
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
  export const Name = sequelize.define('Name', {
    name_name: { type: DataTypes.STRING, allowNull: true },
    age: { type: DataTypes.INTEGER, allowNull: true },
  });