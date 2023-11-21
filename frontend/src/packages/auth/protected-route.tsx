import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/core/state';
import {useNavigate} from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}
export function ProtectedRoute({children}: ProtectedRouteProps) {
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn)
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login');
        }
    }, [loggedIn]);

    return (
        <>
            {children}
        </>
    );
}