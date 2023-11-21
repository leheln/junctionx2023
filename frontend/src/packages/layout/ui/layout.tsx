import React from 'react';
import {User} from '@/packages/layout/ui/user.tsx';
import {Navigation} from '@/packages/layout/ui/navigation.tsx';

interface LayoutProps {
    children: React.ReactNode
}

export function Layout({children}: LayoutProps) {
    return (
        <>
            <header className="bg-background border-b-border backdrop-blur-xl border-solid border-b-[1px] sticky top-0 px-2">
                <div className="container bg-surface-1 flex flex-row justify-between items-center h-14">
                    <div className="flex flex-row items-center">
                        <Navigation/>
                    </div>
                    <User/>
                </div>
            </header>
            <main>
                <div className="container">
                    {children}
                </div>
            </main>
        </>
    );
}