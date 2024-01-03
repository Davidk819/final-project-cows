import { getAll, getKosherNumbersFromDB, insertNewCow } from './dall/dall';
import { publicProcedure, router } from './trpc';
import { z } from 'zod';
import { Cow } from './typs';

export const appRouter = router({
  addCow: publicProcedure
    .input(z.object({ status: z.string(), cow_num: z.number() }))
    .mutation(async ({ input }) => {
      const { status, cow_num } = input;
      const cow = (await insertNewCow(status, cow_num)) as unknown as Cow;
      return cow.cow_id;
    }),
  getAll: publicProcedure.query(async () => {
    const data = await getAll();
    return data;
  }),
  getKosherNumbers: publicProcedure.query(async () => {
    const data = await getKosherNumbersFromDB();
    return data;
  }),
});

export type AppRouter = typeof appRouter;
