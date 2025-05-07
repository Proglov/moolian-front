import { Category, Flavor, Gender, Season } from "@/types/product.type";
import { numberToWords as ntw } from "@persian-tools/persian-tools";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import _ from 'lodash';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const seasonsObject: Record<Season, string> = {
  'autumn': "پاییز",
  'spring': "بهار",
  'summer': "تابستان",
  'winter': "زمستان",
}

export const categoriesObject: Record<Category, string> = {
  'gift': "مناسب هدیه",
  'management': "مدیریتی",
  'party': "مهمانی و مجلسی",
  'sport': "ورزشی",
}

export const gendersObject: Record<Gender, string> = {
  'female': "زنانه",
  'male': "مردانه",
  'unisex': "یونیسکس"
}

export const flavorsObject: Record<Flavor, string> = {
  'warm': 'گرم',
  'cold': 'سرد',
  'mild': 'ملایم',
  'spicy': 'تند',
  'bitter': 'تلخ',
  'sweet': 'شیرین'
}

export const isEmail = (input: string) => /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i.test(input)


export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return typeof error === 'object' && error !== null && 'status' in error && 'data' in error && typeof error.data === 'object' && error.data !== null;
};

export const numberToWords = (inp: number) => {
  try {
    const x = ntw(inp)
    if (x instanceof TypeError)
      throw new Error()
    return x
  } catch (error) {
    return ''
  }
}

export function getChangedFields<T extends Record<string, any>>(a: T, b: T): Partial<T> {
  const diff: Partial<T> = {};
  // Cast keys to `keyof T` to resolve indexing issue
  (Object.keys(a) as Array<keyof T>).forEach((key) => {
    const aVal = a[key];
    const bVal = b[key];
    if (!_.isEqual(aVal, bVal))
      diff[key] = bVal; // Now allowed with proper key typing
  });
  return diff;
}

export const extractFileName = (url: string) => url.split('?')[0].split('/').pop()
