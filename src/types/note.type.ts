
export interface INote {
    _id: string;
    name: string;
    imageKey: string;
}

export interface ICreateNote extends Omit<INote, '_id'> { }