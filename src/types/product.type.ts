import { ICartProductItem } from "@/store/CartProductsSlice";
import { IPagination } from "./api.types";
import { IBrand } from "./brand.type";
import { IFestival } from "./festival";
import { INote } from "./note.type";

export interface INoteInProduct {
    noteId: INote;
    cent: number
}

export interface INoteInCreateProduct {
    noteId: string;
    cent: number
}

export interface IProductRate {
    count: number;
    userId: string;
}

export interface IProduct {
    _id: string;
    availability: boolean;
    rates?: IProductRate[];
    brandId: IBrand;
    country?: string;
    desc: string;
    flavor: Flavor[];
    gender: Gender;
    category: Category;
    olfactory: string;
    imageKeys: string[];
    maker?: string;
    baseNoteObjects: INoteInProduct[];
    initialNoteObjects: INoteInProduct[];
    midNoteObjects: INoteInProduct[];
    nameEN: string;
    nameFA: string;
    price: number;
    season: Season[];
    year?: number;
    festival?: IFestival;
}

export interface ICreateProduct extends Omit<IProduct, 'brandId' | 'baseNoteObjects' | 'initialNoteObjects' | 'midNoteObjects' | '_id' | 'availability'> {
    brandId: string;
    baseNoteObjects: INoteInCreateProduct[];
    initialNoteObjects: INoteInCreateProduct[];
    midNoteObjects: INoteInCreateProduct[];
}

export interface IUpdateProduct extends Partial<ICreateProduct> {
    _id: string;
    availability?: boolean;
}

export interface IAddRateProduct {
    _id: string;
    count: number
}

export interface IGetProductsQuery extends IPagination {
    onlyAvailable?: boolean;
    brandId?: string;
    category?: Category;
    flavor?: Flavor;
    gender?: Gender;
    season?: Season;
    orderBy?: OrderBy;
    search?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IProductGetByIds extends Pick<IProduct, '_id' | 'price' | 'nameEN' | 'nameFA' | 'festival' | 'imageKeys' | 'season' | 'category' | 'brandId' | 'flavor' | 'gender' | 'rates'> { }

export interface IProductGetByIdsWithDetails extends IProductGetByIds, ICartProductItem { }

export enum Gender {
    male = "male",
    female = "female",
    unisex = "unisex"
}

export enum Flavor {
    warm = 'warm',
    cold = 'cold',
    bitter = 'bitter',
    sweet = 'sweet',
    spicy = 'spicy',
    mild = 'mild'

}

export enum Season {
    spring = "spring",
    summer = "summer",
    autumn = "autumn",
    winter = "winter"
}

export enum Category {
    management = "management",
    party = "party",
    sport = "sport",
    gift = "gift"
}

export enum OrderBy {
    New = "New",
    cheap = "cheap",
    expensive = "expensive",
}

export enum Notes {
    initialNote,
    midNote,
    baseNote
}