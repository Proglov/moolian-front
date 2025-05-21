import { IUserInfo } from '@/types/auth.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: IUserInfo = {
    _id: '',
    isLoggedIn: false,
    isAuthLoaded: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SetUserInfo: (state, action: PayloadAction<Omit<IUserInfo, 'isLoggedIn' | 'isAuthLoaded'>>) => {
            console.log(action.payload);
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.isLoggedIn = action.payload._id !== '';
            state.isAuthLoaded = true;
        },
        LogOut: state => {
            state = { isLoggedIn: false, _id: '', isAuthLoaded: true };
        },
    },
})

export const { LogOut, SetUserInfo } = authSlice.actions

export default authSlice.reducer