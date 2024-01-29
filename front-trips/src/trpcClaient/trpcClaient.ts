import { createTRPCProxyClient, createWSClient, httpBatchLink, splitLink, wsLink } from '@trpc/client';
import  AppRouter  from '../../../back-trips/src/main';
import { QueryClient } from 'react-query';

export const queryClient = new QueryClient();


const wsClient = createWSClient({
    url: "ws://localhost:3000",
})

export const trpc = 
createTRPCProxyClient<AppRouter>({
    links: [
        splitLink({
            condition: op => {
                return op.type === 'subscription'
            },
            true: wsLink({
                client: wsClient,
            }),
      
        false: 
        httpBatchLink({
            url: "http://localhost:3000",
        }),
    }),
    ],
});


