import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {HomePage} from 'src/pages/home';
import {EventsPage} from 'src/pages/events';
import {StorePage} from 'src/pages/store';
import {LoginPage, ProtectedRoute} from '@/packages/auth';
import {CodePage} from "@/pages/code";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'*'} element={<Navigate to="/home" replace={true}/>}/>

                <Route path={'/login'} element={<LoginPage/>}/>

                <Route path={'/home'} element={
                    <ProtectedRoute>
                        <HomePage/>
                    </ProtectedRoute>
                }/>

                <Route path={'/events'} element={
                    <ProtectedRoute>
                        <EventsPage/>
                    </ProtectedRoute>
                }/>

                <Route path={'/store'} element={
                    <ProtectedRoute>
                        <StorePage/>
                    </ProtectedRoute>
                }/>

                <Route path={'/code'} element={
                    <ProtectedRoute>
                        <CodePage/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </BrowserRouter>
    );
}