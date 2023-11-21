import {configureStore} from '@reduxjs/toolkit';
import {authReducer as auth} from '@/packages/auth';

export const store = configureStore({
    reducer: {
        auth
    }
})

export type RootState = ReturnType<typeof store.getState>