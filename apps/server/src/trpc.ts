import {initTRPC, TRPCError } from '@trpc/server';
import { createContext } from './context';
/**

 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<typeof createContext>().create();
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const { createCallerFactory, router } = t;
export const publicProcedure = t.procedure;