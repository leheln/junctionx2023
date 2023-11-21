import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {DashboardPage} from 'src/pages/dashboard';
import {LoginPage, ProtectedRoute} from '@/packages/auth';

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'*'} element={<Navigate to="/dashboard" replace={true}/>}/>

                <Route path={'/login'} element={<LoginPage/>}/>

                <Route path={'/dashboard'} element={
                    <ProtectedRoute>
                        <DashboardPage/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </BrowserRouter>
    );
}