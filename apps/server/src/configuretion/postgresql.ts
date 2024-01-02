import { Sequelize } from 'sequelize';

import dotenv from "dotenv";

dotenv.config();


export const sequelize = new Sequelize('cows', 'postgres', 'david2000', {
    host: 'localhost',
    dialect:  'postgres'
  });

export const sequelizeConnection = async () => {
    try {
        
        await sequelize.authenticate()
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}








