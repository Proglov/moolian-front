
export interface IUser {
    name: string;
    _id: string;
    address: string[];
    email: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    phone: string;
    username: string;
}

export interface IUpdateUser extends Partial<Omit<IUser, '_id' | 'isEmailVerified' | 'isPhoneVerified'>> { }