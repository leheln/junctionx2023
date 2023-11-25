import React, {useEffect, useState} from 'react';
import SpinLoader from '@/components/spin-loader.tsx';
import {useToast} from '@/components/ui/use-toast.ts';
import {useDispatch} from 'react-redux';
import {login, logout} from '@/packages/auth/state/auth.state.ts';
import {axios} from '@/core/axios';

interface AuthProps {
    children: React.ReactNode;
}

// When the page loads, this part of the code is responsible for asking the server if the user is logged in or not.
// Based on the response the auth slice gets updated.
// After the state is updated, the ProtectedRoute component reacts to that, redirecting to the appropriate location.
export function Auth({children}: AuthProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const {toast} = useToast();
    const dispatch = useDispatch();


    useEffect(() => {
        axios.post('/api/auth/whoami')
            .then(response => {
                if (response.data.loggedIn) {
                    dispatch(login({
                        id: response.data.id,
                        email: response.data.email,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                    }))
                } else {
                    dispatch(logout())
                }
                setLoading(false);
            })
            .catch(() => {
                toast({
                    variant: 'destructive',
                    title: 'An error has occurred.',
                    description: 'Try reloading the page. If the issue persists please contact support.'
                });
            });
    }, []);

    return (
        <>
            {loading ? (
                <div
                    className="flex flex-col h-screen w-screen items-center justify-center">
                    <SpinLoader size={64}/>
                </div>
            ) : children}
        </>
    );
}