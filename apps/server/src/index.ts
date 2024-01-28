import { createHTTPServer } from '@trpc/server/adapters/standalone';
import {sequelizeConnection } from './configuretion/postgresql';
import { appRouter } from './router';
import cors from 'cors';
import 'dotenv/config';
import { createContext } from './context';
// import { createTable } from './configuretion/sequelizeSchima';


const PORT = +(process.env.PORT_SERVER) || 3008


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
