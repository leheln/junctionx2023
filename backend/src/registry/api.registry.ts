import {Application} from 'express';
import {authenticationMiddleware as authentication, loginApi, logoutApi, whoamiApi} from '@/packages/auth';
// Register APIs into this file from each feature
export const apiRegistry = (app: Application) => {
    app.post('/api/auth/login', loginApi);
    app.post('/api/auth/logout', logoutApi);
    app.post('/api/auth/whoami', whoamiApi);

    //app.post('/api/protected/route', authentication, exampleEndpoint);
};