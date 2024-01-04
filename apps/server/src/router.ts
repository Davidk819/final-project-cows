import { getAll, getKosherNumbersFromDB, insertNewCow } from './dall/dall';
import { publicProcedure, router } from './trpc';
import { z } from 'zod';



export const appRouter = router({
  addCow: publicProcedure
    .input(z.object({ status: z.string(), cow_num: z.number() }))
    .mutation(async ({ input }) => {
      const { status, cow_num } = input;
      const cow = await insertNewCow(status, cow_num)
      if (cow)
      return {...cow};
    }),
  getAll: publicProcedure.query(async () => {
    const data = await getAll();
    return data.map(cow => ({...cow.dataValues}))
    
  }),
  getKosherNumbers: publicProcedure.query(async () => {
    const data = await getKosherNumbersFromDB();
    return data.map(cow => (cow.dataValues.cow_num))
  }),
  
});

export type AppRouter = typeof appRouter;
