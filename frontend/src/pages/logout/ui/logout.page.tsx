import {useEffect} from 'react';
import {axios} from '@/core/axios';

export function LogoutPage() {
    useEffect(() => {
        axios.post('/api/auth/logout').finally(() => {window.location.href = '/'});
    });
    return (<div>Logging out...</div>)
}
