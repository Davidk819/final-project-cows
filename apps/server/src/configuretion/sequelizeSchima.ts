import {  DataTypes } from 'sequelize';
import { sequelize } from './postgresql';
import {  Model } from 'sequelize';
import { CowAttributesCreate, CowAttributesRead, DaySumAttributesCreate, DaySumAttributesRead } from '../assets/types';
// import { CowAttributes } from '../typs';



// interface CowInstance extends Model<CowAttributes>, CowAttributes {}


export const DaySum = sequelize.define<Model<DaySumAttributesRead, DaySumAttributesCreate>>(
  'day_sum',
  {
    date: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    k_sum: {
      type: DataTypes.INTEGER,
    },
    kPlus_sum: {
      type: DataTypes.INTEGER,
    },
    t1: {
      type: DataTypes.INTEGER,
    },
    t2: {
      type: DataTypes.INTEGER,
    },
    t3: {
      type: DataTypes.INTEGER,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  }
);

export const Cow = sequelize.define<Model<CowAttributesRead, CowAttributesCreate>>(
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
    stage: {
      type: DataTypes.INTEGER,
    },
    rea_img: {
      type: DataTypes.TEXT,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
);






  export const createTable = async ()=>{
    try {
      await DaySum.sync()
    } catch (error) {
      console.error(error);
    }
  }
  export const Name = sequelize.define('Name', {
    name_name: { type: DataTypes.STRING, allowNull: true },
    age: { type: DataTypes.INTEGER, allowNull: true },
  });