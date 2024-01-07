import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../back-trips/src/main';
import { httpLink } from '@trpc/client'
import { createTRPCJotai } from 'jotai-trpc'



export const trpc = 
createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: "http://localhost:3000",
        }),
    ],
});


// export const trpcJotai = createTRPCJotai<AppRouter>({
//   links: [
//     httpLink({
//       url: "http://localhost:3000",
//     }),
//   ],
// })