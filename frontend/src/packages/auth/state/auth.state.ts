import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
    loggedIn: boolean,
    email?: string,
    firstName?: string,
    lastName?: string,
}

const initialAuthState: AuthState = {
    loggedIn: false
};

interface LoginPayload {
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
                email: action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName
            };
        },
        logout: () => initialAuthState
    }
});

export const {login, logout} = authSlice.actions;
export const authReducer = authSlice.reducer;
