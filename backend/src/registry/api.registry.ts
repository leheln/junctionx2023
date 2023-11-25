import {Application} from 'express';
import {
    authenticationMiddleware as authentication,
    eventCreateApi,
    eventDeleteApi,
    eventGetApi,
    eventGetAttendanceApi,
    eventGetListApi,
    eventUpdateApi,
    eventValidateParticipationApi,
    loginApi,
    logoutApi,
    storeItemCreateApi,
    storeItemDeleteApi,
    storeItemGetApi,
    storeItemListApi,
    storeItemRedeemApi,
    storeItemUpdateApi,
    userAddConsumption,
    userAddEventAttendance,
    userAddPass,
    userDeleteConsumption,
    userDeleteEventAttendance,
    userDeletePass,
    userGetApi,
    userGetConsumptionsApi,
    userGetEventsApi,
    userGetPassesApi,
    userGetStoreItemsApi,
    whoamiApi
} from '@/packages/auth';
import {tryUtilitiesApi} from '@/packages/consumption/api/try-utilities';
import {getQRApi} from '@/packages/qr/api/getQR.api';

const API_PREFIX = '/api';
// Register APIs into this file from each feature
export const apiRegistry = (app: Application) => {
    app.post(`${API_PREFIX}/auth/login`, loginApi);
    app.post(`${API_PREFIX}/auth/logout`, logoutApi);
    app.post(`${API_PREFIX}/auth/whoami`, whoamiApi);

    app.post(`${API_PREFIX}/consumption/try-utilities`, authentication, tryUtilitiesApi);

    app.post(`${API_PREFIX}/qr/get`, authentication, getQRApi);

    app.get(`${API_PREFIX}/users/storeItems`, authentication, userGetStoreItemsApi);
    app.post(`${API_PREFIX}/users/events/:eventId`, authentication, userAddEventAttendance);
    app.get(`${API_PREFIX}/users/:userId`, authentication, userGetApi);
    app.get(`${API_PREFIX}/users/:userId/events`, authentication, userGetEventsApi);
    app.get(`${API_PREFIX}/users/:userId/consumptions`, authentication, userGetConsumptionsApi);
    app.get(`${API_PREFIX}/users/:userId/passes`, authentication, userGetPassesApi);
    app.delete(`${API_PREFIX}/users/:userId/events/:eventId`, authentication, userDeleteEventAttendance);

    app.post(`${API_PREFIX}/users/:userId/passes`, authentication, userAddPass)
    app.delete(`${API_PREFIX}/users/:userId/passes/:passId`, authentication, userDeletePass)
    
    app.post(`${API_PREFIX}/users/consumptions`, authentication, userAddConsumption)
    app.delete(`${API_PREFIX}/users/:userId/consumptions/:consumptionId`, authentication, userDeleteConsumption)

    app.get(`${API_PREFIX}/events`, authentication, eventGetListApi)
    app.post(`${API_PREFIX}/events`, authentication, eventCreateApi)
    app.get(`${API_PREFIX}/events/:eventId`, authentication, eventGetApi)
    app.get(`${API_PREFIX}/events/:eventId/attendance`, authentication, eventGetAttendanceApi)
    app.put(`${API_PREFIX}/events/:eventId`, authentication, eventUpdateApi)
    app.delete(`${API_PREFIX}/events/:eventId`, authentication, eventDeleteApi)
    app.post(`${API_PREFIX}/events/:eventId/users/:userId/validateParticipation`, authentication, eventValidateParticipationApi)

    app.get(`${API_PREFIX}/storeItems`, authentication, storeItemListApi)
    app.post(`${API_PREFIX}/storeItems`, authentication, storeItemCreateApi)
    app.get(`${API_PREFIX}/storeItems/:storeItemId`, authentication, storeItemGetApi)
    app.put(`${API_PREFIX}/storeItems/:storeItemId`, authentication, storeItemUpdateApi)
    app.delete(`${API_PREFIX}/storeItems/:storeItemId`, authentication, storeItemDeleteApi)
    app.post(`${API_PREFIX}/storeItems/:storeItemId/redeem`, authentication, storeItemRedeemApi)

};