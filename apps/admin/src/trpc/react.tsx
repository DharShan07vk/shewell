'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useState } from 'react';

import { type AppRouter } from '@/src/server/api/root';
import { getUrl, transformer } from './shared';

export const apiClient = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Disable automatic refetching to prevent performance issues
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        // Keep data fresh for 30 seconds before considering it stale
        staleTime: 30 * 1000,
        // Cache data for 5 minutes
        cacheTime: 5 * 60 * 1000,
      },
    },
  }));

  const [trpcClient] = useState(() =>
    apiClient.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) => process.env.NODE_ENV === 'development' || (op.direction === 'down' && op.result instanceof Error)
        }),
        unstable_httpBatchStreamLink({
          url: getUrl()
        })
      ]
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <apiClient.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </apiClient.Provider>
    </QueryClientProvider>
  );
}
