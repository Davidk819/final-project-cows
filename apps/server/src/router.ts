import {
  getAll,
  getCowDataFromDB,
  getKosherNumbersFromDB,
  getNumbersByStageFromDB,
  insertNewCow,
  moveStageDB,
  setFinalStatusInDB,
  setTarefInDB,
} from './dall/dall';
import { publicProcedure, router } from './trpc';
import { z } from 'zod';

export const appRouter = router({
  addCow: publicProcedure
    .input(z.object({ status: z.string(), cow_num: z.number() }))
    .mutation(async ({ input }) => {
      const { status, cow_num } = input;
      const cow = await insertNewCow(status, cow_num);
      if (cow) return { ...cow };
    }),
  getAll: publicProcedure.query(async () => {
    const data = await getAll();
    return data.map((cow) => ({ ...cow.dataValues }));
  }),
  getKosherNumbers: publicProcedure.query(async () => {
    const data = await getKosherNumbersFromDB();
    return data.map((cow) => cow.dataValues.cow_num);
  }),
  getAllByStage: publicProcedure.input(z.number()).query(async ({ input }) => {
    const stage = input;
    const data = await getNumbersByStageFromDB(stage);
    return data
  }),
  setTaref: publicProcedure.input(z.object({stage: z.number(), cow_num: z.number()})).mutation(async({input}) =>{
    const {stage,cow_num} = input;
    const data = await setTarefInDB(stage,cow_num);
    return data
  }),
  setFinalStatus: publicProcedure.input(z.object({status: z.string(), cow_num: z.number()})).mutation(async({input}) =>{
    const {status ,cow_num} = input;
    const data = await setFinalStatusInDB(status,cow_num);
    return data
  }),
  moveStage: publicProcedure.input(z.object({stage:z.number(),  cow_num: z.number(), image: z.string()})).mutation(async({input}) =>{
    const {cow_num, stage, image} = input;
    console.log(input);
    
    const data = await moveStageDB(stage,cow_num,image );
    return data
  }),
  getCowData: publicProcedure.input(z.number()).mutation(async({input}) =>{
    console.log(input);
    
    const data = await getCowDataFromDB(input);
    return data
  })

});

export type AppRouter = typeof appRouter;
