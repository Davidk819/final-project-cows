import { createHTTPServer } from '@trpc/server/adapters/standalone';
import {sequelizeConnection } from './configuretion/postgresql';
import { appRouter } from './router';
import cors from 'cors';
// import { createTable } from './configuretion/sequelizeSchima';




const server = createHTTPServer({
  router: appRouter,
  middleware: cors()
});
const start = async () => {
  await sequelizeConnection();
  server.listen(3000);

};
start();
