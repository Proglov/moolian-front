import { IUserInfo } from '@/types/auth.type';
import { createSlice } from '@reduxjs/toolkit'

const initialState: IUserInfo = { isLoggedIn: false }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SetUserInfo: (state, action: { type: string, payload: string }) => {
            state.name = action.payload;
            state.isLoggedIn = true;
        },
        LogOut: state => {
            state = { isLoggedIn: false };
        },
    },
})

export default authSlice.reducer