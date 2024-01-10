import { Sequelize } from 'sequelize';

// import dotenv from "dotenv";

// dotenv.config();

// const sequelize = new Sequelize('postgres://meathouse_user:wfPbQm738hIoFIdFDuGhv0T9VOVbv2pY@dpg-cm41leen7f5s73bsb3d0-a.oregon-postgres.render.com/meathouse') 

export const sequelize = new Sequelize('meathouse', 'meathouse_user', process.env.DB_PASSWORD, {
    host: 'dpg-cm41leen7f5s73bsb3d0-a.oregon-postgres.render.com',
    dialect:  'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, 
      },
    },
  });

export const sequelizeConnection = async () => {
    try {
        
        await sequelize.authenticate()
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}








