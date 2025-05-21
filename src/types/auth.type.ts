

export interface ISignup {
    username: string;
    email: string;
    password: string;
    phone: string;
}


export interface ISigninPhone {
    password: string;
    phone: string;
}


export interface ISigninEmailOrUsername {
    password: string;
    emailOrUsername: string;
}

export interface IUserInfo {
    _id: string;
    name?: string;
    isLoggedIn: boolean;
    isAuthLoaded: boolean;
}