"use client";
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

interface ProvidersProps {
    children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
    return (
        <Provider store={store}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </Provider>
    );
};

export default Providers;