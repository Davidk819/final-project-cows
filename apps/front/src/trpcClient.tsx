import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../server/src/router';



export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'https://cow-service-2.onrender.com',
      headers: () => {
        return {
          Authorization: String(localStorage.getItem('token')),
        }
      }
    }),
  ],
});


