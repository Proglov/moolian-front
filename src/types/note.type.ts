
export interface INote {
    _id: string;
    name: string;
    imageKey: string;
}


/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface ICreateNote extends Omit<INote, '_id'> { }