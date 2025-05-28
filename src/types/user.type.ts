
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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUpdateUser extends Partial<Omit<IUser, '_id' | 'isEmailVerified' | 'isPhoneVerified'>> { }

export interface IChangePAssword {
    password: string;
    currentPassword: string;
}