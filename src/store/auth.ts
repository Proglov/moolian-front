import { IUserInfo } from '@/types/auth.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: IUserInfo = { isLoggedIn: false, _id: '' }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SetUserInfo: (state, action: PayloadAction<Omit<IUserInfo, 'isLoggedIn'>>) => {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.isLoggedIn = true;
        },
        LogOut: state => {
            state = { isLoggedIn: false, _id: '' };
        },
    },
})

export const { LogOut, SetUserInfo } = authSlice.actions

export default authSlice.reducer