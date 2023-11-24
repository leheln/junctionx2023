import {Application} from 'express';
import {authenticationMiddleware as authentication, loginApi, logoutApi, userGetApi, userGetConsumptionsApi, userGetEventsApi, userGetPassesApi, whoamiApi} from '@/packages/auth';

const API_PREFIX = "/api"
// Register APIs into this file from each feature
export const apiRegistry = (app: Application) => {
    app.post(`${API_PREFIX}/auth/login`, loginApi);
    app.post(`${API_PREFIX}/auth/logout`, logoutApi);
    app.post(`${API_PREFIX}/auth/whoami`, whoamiApi);
    
    //app.post('/api/protected/route', authentication, exampleEndpoint);
    app.get(`${API_PREFIX}/users/:userId`, authentication, userGetApi)
    app.get(`${API_PREFIX}/users/:userId/events`, authentication, userGetEventsApi)
    app.get(`${API_PREFIX}/users/:userId/consumptions`, authentication, userGetConsumptionsApi)
    app.get(`${API_PREFIX}/users/:userId/passes`, authentication, userGetPassesApi)
};