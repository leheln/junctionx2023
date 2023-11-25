import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
    loggedIn: boolean,
    id?: string
    email?: string,
    firstName?: string,
    lastName?: string,
    credits?: number 
}

const initialAuthState: AuthState = {
    loggedIn: false
};

interface CreditPayload {
    credits: number
}
interface LoginPayload {
    id: string,
    email: string,
    firstName: string,
    lastName: string
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login: (_, action: PayloadAction<LoginPayload>) => {
            return {
                loggedIn: true,
                id: action.payload.id,
                email: action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName
            };
        },

        creditUpdate: (d, action: PayloadAction<CreditPayload>) => {
            return {
                ...d,
                credits: action.payload.credits
            }
        },

        logout: () => initialAuthState
    }
});

export const {login, logout, creditUpdate} = authSlice.actions;
export const authReducer = authSlice.reducer;
