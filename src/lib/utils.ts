import { Category, Flavor, Gender, Season } from "@/types/product.type";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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