import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {HomePage} from 'src/pages/home';
import {EventsPage} from 'src/pages/events';
import {StorePage} from 'src/pages/store';
import {LoginPage, ProtectedRoute} from '@/packages/auth';
import {CodePage} from "@/pages/code";
import {AddUtilitiesPage} from "@/pages/add-utilities";
import {EventPage} from "@/pages/event";
import { StoreItemPage } from '@/pages/store-item';

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

                <Route path={'/events/:eventId'} element={
                    <ProtectedRoute>
                        <EventPage/>
                    </ProtectedRoute>
                }/>

                <Route path={'/store'} element={
                    <ProtectedRoute>
                        <StorePage/>
                    </ProtectedRoute>
                }/>
                <Route path={'/store/:storeItemId'} element={
                    <ProtectedRoute>
                        <StoreItemPage/>
                    </ProtectedRoute>
                }/>

                <Route path={'/code'} element={
                    <ProtectedRoute>
                        <CodePage/>
                    </ProtectedRoute>
                }/>

                <Route path={'/add-utilities'} element={
                    <ProtectedRoute>
                        <AddUtilitiesPage/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </BrowserRouter>
    );
}