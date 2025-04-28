import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFarsiSeason(season: string): string {
  switch (season) {
    case "spring":
      return "بهار";
    case "summer":
      return "تابستان";
    case "autumn":
      return "پاییز";
    case "winter":
      return "زمستان";
    default:
      return "فصل نامعلوم";
  }
}

export function getFarsiCategory(category: string): string {
  switch (category) {
    case "management":
      return "مدیریتی";
    case "party":
      return "مهمانی و مجلسی";
    case "sport":
      return "ورزشی";
    case "gift":
      return "مناسب هدیه";
    default:
      return "دسته بندی نامعلوم";
  }
}

export function getFarsiSex(sex: string): string {
  switch (sex) {
    case "male":
      return "مردانه";
    case "female":
      return "زنانه";
    case "unisex":
      return "یونیسکس";
    default:
      return "جنسیت نامعلوم";
  }
}

export function getFarsiFlavor(flavor: string): string {
  switch (flavor) {
    case "warm":
      return "گرم";
    case "cold":
      return "سرد";
    case "bitter":
      return "تلخ";
    case "sweet":
      return "شیرین";
    case "spicy":
      return "تند";
    case "mild":
      return "ملایم";
    default:
      return "طعم نامعلوم";
  }
}


export const isEmail = (input: string) => /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i.test(input)


export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return typeof error === 'object' && error !== null && 'status' in error && 'data' in error && typeof error.data === 'object' && error.data !== null;
};