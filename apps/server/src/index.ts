import { createHTTPServer } from '@trpc/server/adapters/standalone';
import {sequelizeConnection } from './configuretion/postgresql';
import { appRouter } from './router';
import cors from 'cors';
import dotenv from 'dotenv'
import { createContext } from './context';
// import { createTable } from './configuretion/sequelizeSchima';

dotenv.config();

const PORT = process.env.PORT_SERVER as unknown as number || 3000


const server = createHTTPServer({
  router: appRouter,
  middleware: cors(),
  createContext: createContext
});
const start = async () => {
  await sequelizeConnection();
  server.listen(PORT);
  console.log(PORT);
  

};
start();
