import {Application} from 'express';
import {
    authenticationMiddleware as authentication,
    eventCreateApi,
    eventDeleteApi,
    eventGetApi,
    eventGetAttendanceApi,
    eventGetListApi,
    eventUpdateApi,
    loginApi,
    logoutApi,
    storeItemCreateApi,
    storeItemDeleteApi,
    storeItemGetApi,
    storeItemListApi,
    storeItemUpdateApi,
    userAddConsumption,
    userAddEventAttendance,
    userAddPass,
    userDeleteConsumption,
    userDeletePass,
    userGetApi,
    userGetConsumptionsApi,
    userGetEventsApi,
    userGetPassesApi,
    whoamiApi
} from '@/packages/auth';
import {tryUtilitiesApi} from '@/packages/consumption/api/try-utilities';

const API_PREFIX = '/api';
// Register APIs into this file from each feature
export const apiRegistry = (app: Application) => {
    app.post(`${API_PREFIX}/auth/login`, loginApi);
    app.post(`${API_PREFIX}/auth/logout`, logoutApi);
    app.post(`${API_PREFIX}/auth/whoami`, whoamiApi);

    app.post(`${API_PREFIX}/consumption/try-utilities`, authentication, tryUtilitiesApi);

    app.get(`${API_PREFIX}/users/:userId`, authentication, userGetApi);
    app.get(`${API_PREFIX}/users/:userId/events`, authentication, userGetEventsApi);
    app.get(`${API_PREFIX}/users/:userId/consumptions`, authentication, userGetConsumptionsApi);
    app.get(`${API_PREFIX}/users/:userId/passes`, authentication, userGetPassesApi);
    app.post(`${API_PREFIX}/users/:userId/events/:eventId`, authentication, userAddEventAttendance);

    app.post(`${API_PREFIX}/users/:userId/passes`, authentication, userAddPass)
    app.delete(`${API_PREFIX}/users/:userId/passes/:passId`, authentication, userDeletePass)
    
    app.post(`${API_PREFIX}/users/:userId/consumptions`, authentication, userAddConsumption)
    app.delete(`${API_PREFIX}/users/:userId/consumptions/:consumptionId`, authentication, userDeleteConsumption)

    app.get(`${API_PREFIX}/events`, authentication, eventGetListApi)
    app.post(`${API_PREFIX}/events`, authentication, eventCreateApi)
    app.get(`${API_PREFIX}/events/:eventId`, authentication, eventGetApi)
    app.get(`${API_PREFIX}/events/:eventId/attendance`, authentication, eventGetAttendanceApi)
    app.put(`${API_PREFIX}/events/:eventId`, authentication, eventUpdateApi)
    app.delete(`${API_PREFIX}/events/:eventId`, authentication, eventDeleteApi)

    app.get(`${API_PREFIX}/storeItems`, authentication, storeItemListApi)
    app.post(`${API_PREFIX}/storeItems`, authentication, storeItemCreateApi)
    app.get(`${API_PREFIX}/storeItems/:storeItemId`, authentication, storeItemGetApi)
    app.put(`${API_PREFIX}/storeItems/:storeItemId`, authentication, storeItemUpdateApi)
    app.delete(`${API_PREFIX}/storeItems/:storeItemId`, authentication, storeItemDeleteApi)

};