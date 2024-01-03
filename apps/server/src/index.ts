import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { sequelize, sequelizeConnection } from './configuretion/postgresql';
import { json } from 'sequelize';
import { appRouter } from './router';
import cors from 'cors';
import { initTRPC } from '@trpc/server';

const t = initTRPC.create();
const middleware  = t.middleware



const server = createHTTPServer({
  router: appRouter,
  middleware: cors()
});
const start = async () => {
  await sequelizeConnection();
  server.listen(3000);

};
start();
