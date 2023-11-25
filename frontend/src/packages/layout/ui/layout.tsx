import React from 'react';
import {Navigation} from '@/packages/layout/ui/navigation.tsx';
import {FaChevronLeft} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import {ClassNames} from "react-day-picker";

interface LayoutProps {
    className?: ClassNames | string,
    title?: string
    showBack?: boolean
    showNavigation?: boolean
    children: React.ReactNode
}

export function Layout({className, title, showBack, showNavigation, children}: LayoutProps) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col">
            {(title || showBack) && (
                <header
                    className="bg-background border-b-[1px] sticky top-0 h-12 px-2 flex justify-between items-center">
                    {showBack && <FaChevronLeft className="w-6 h-6" onClick={() => navigate(-1)}/>}
                    <span className="flex-grow text-center text-xl">{title}</span>
                    {showBack && <div className="w-6 h-6"/>}
                </header>
            )}
            <main className={(className ?? "") + " flex-grow"}>
                {children}
            </main>
            <footer className="bg-background sticky bottom-0 border-t-[1px]">
                {showNavigation && <Navigation/>}
            </footer>
        </div>
    );
}