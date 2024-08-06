'use client';
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

const QueryClientProvider = ({ children }: PropsWithChildren) => {
    return (
        <ReactQueryClientProvider client={new QueryClient()}>
            {children}
        </ReactQueryClientProvider>
    )
}

export default QueryClientProvider