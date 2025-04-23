import { IBrand } from "./brand.type";
import { INote } from "./note.type";

export interface INoteInProduct {
    noteId: INote;
    cent: number
}

export interface INoteInCreateProduct {
    noteId: string;
    cent: number
}

export interface IProduct {
    _id: string;
    availability: boolean;
    brandId: IBrand;
    country: string;
    desc: string;
    flavor: string[];
    gender: string;
    category: string;
    olfactory: string;
    imageKeys: string[];
    maker: string;
    baseNoteObjects: INoteInProduct[];
    initialNoteObjects: INoteInProduct[];
    midNoteObjects: INoteInProduct[];
    nameEN: string;
    nameFA: string;
    price: number;
    season: string[];
    year: number;
}

export interface ICreateProduct extends Omit<IProduct, 'brandId' | 'baseNoteObjects' | 'initialNoteObjects' | 'midNoteObjects' | '_id' | 'availability'> {
    brandId: string;
    baseNoteObjects: INoteInCreateProduct[];
    initialNoteObjects: INoteInCreateProduct[];
    midNoteObjects: INoteInCreateProduct[];
}

export interface IUpdateProduct extends Partial<ICreateProduct> {
    _id: string
}