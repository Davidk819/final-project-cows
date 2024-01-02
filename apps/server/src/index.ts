import { setTimeout } from 'timers/promises';
import { publicProcedure, router } from './trpc';
import { log } from 'console';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { sequelize, sequelizeConnection } from './configuretion/postgresql';
import { Cow, Name } from './configuretion/sequelizeSchima';

async function someFunction() {
  try {
    const newCow = await Cow.findAll()
  } catch (error) {
    console.error('Error creating cow:' );
  }
}

const appRouter = router({
  userList: publicProcedure.query(async () => {
    // Retrieve users from a datasource, this is an imaginary database
    await sequelize.sync();
    const users = await someFunction();
    return 'll';
  }),
});

const server = createHTTPServer({
  router: appRouter,
});
const start = async () => {
  await sequelizeConnection();
  server.listen(3000);
};
start();
