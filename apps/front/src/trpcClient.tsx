import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
// eslint-disable-next-line @nx/enforce-module-boundaries
import type { AppRouter } from '../../server/src/router';



export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
      headers: () => {
        return {
          Authorization: String(localStorage.getItem('token')),
        }
      }
    }),
  ],
});


