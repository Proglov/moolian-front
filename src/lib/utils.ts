import { Category, Flavor, Gender, OrderBy, Season } from "@/types/product.type";
import { digitsEnToFa, digitsFaToEn, numberToWords as ntw, timeAgo } from "@persian-tools/persian-tools";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import _ from 'lodash';
import { TStatusObject, TXStatus } from "@/types/transaction";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const seasonsObject: Record<Season, string> = {
  'spring': "بهار",
  'summer': "تابستان",
  'autumn': "پاییز",
  'winter': "زمستان",
}

export function isValidSeason(value: any): value is Season {
  return Object.values(Season).includes(value as Season);
}

export const categoriesObject: Record<Category, string> = {
  'gift': "مناسب هدیه",
  'management': "مدیریتی",
  'party': "مهمانی و مجلسی",
  'sport': "ورزشی",
}

export function isValidCategory(value: any): value is Category {
  return Object.values(Category).includes(value as Category);
}

export const gendersObject: Record<Gender, string> = {
  'female': "زنانه",
  'male': "مردانه",
  'unisex': "اسپورت"
}

export function isValidGender(value: any): value is Gender {
  return Object.values(Gender).includes(value as Gender);
}

export const flavorsObject: Record<Flavor, string> = {
  'warm': 'گرم',
  'cold': 'سرد',
  'mild': 'ملایم',
  'spicy': 'تند',
  'bitter': 'تلخ',
  'sweet': 'شیرین'
}

export function isValidFlavor(value: any): value is Flavor {
  return Object.values(Flavor).includes(value as Flavor);
}

export function isValidOrderBy(value: any): value is OrderBy {
  return Object.values(OrderBy).includes(value as OrderBy);
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
  } catch (_error) {
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

export const getDateParts = (date: Date) => {

  interface DateParts {
    year?: string;
    month?: string;
    day?: string;
    hour?: string;
    minute?: string;
    second?: string;
  }

  const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Tehran'
  });

  const parts = formatter.formatToParts(date);
  const dateParts: DateParts = {};

  for (const part of parts) {
    if (
      part.type === 'year' ||
      part.type === 'month' ||
      part.type === 'day' ||
      part.type === 'hour' ||
      part.type === 'minute' ||
      part.type === 'second'
    ) {
      dateParts[part.type] = part.value;
    }
  }

  return dateParts

}

export const timeFromNow = (date: Date) => {

  const dateParts = getDateParts(date)
  // Construct formatted string yyyy/mm/dd hh:mm:ss
  const formatted = `${dateParts.year}/${dateParts.month}/${dateParts.day} ${dateParts.hour}:${dateParts.minute}:${dateParts.second}`;

  return digitsEnToFa(timeAgo(digitsFaToEn(formatted)))
}

export const formattedTime = (date: Date) => {
  const dateParts = getDateParts(date)
  return `${dateParts.year}/${dateParts.month}/${dateParts.day} ${dateParts.hour}:${dateParts.minute}`;
}

const textColors = {
  warning: 'oklch(0.89 0.1554 115)',
  destructive: 'oklch(0.577 0.245 27.325)',
  success: 'oklch(0.7 0.2393 154.91)',
  info: 'oklch(0.9 0.185 194.61)',
  orange: 'oklch(0.74 0.1776 76.02)'
}

export const statusObject: TStatusObject = {
  'Initial': {
    color: textColors.destructive,
    fa: 'ناتمام',
    next: TXStatus.Requested,
    nextFA: 'پرداخت سفارش',
    nextColor: textColors.warning
  },
  'Requested': {
    color: textColors.warning,
    fa: 'درخواست داده شده',
    next: TXStatus.Accepted,
    nextFA: 'قبول',
    nextColor: textColors.orange
  },
  'Accepted': {
    color: textColors.orange,
    fa: 'تایید شده و در حال آماده سازی',
    next: TXStatus.Sent,
    nextFA: 'ارسال شد',
    nextColor: textColors.info
  },
  'Sent': {
    color: textColors.info,
    fa: 'ارسال شده',
    next: TXStatus.Received,
    nextFA: 'دریافت شد',
    nextColor: textColors.success
  },
  'Received': {
    color: textColors.success,
    fa: 'دریافت شده'
  },
  'Canceled': {
    color: textColors.destructive,
    fa: 'کنسل شده'
  },
}

export const statusObjectUser: TStatusObject = {
  'Initial': {
    color: textColors.destructive,
    fa: 'ناتمام',
    next: TXStatus.Requested,
    nextFA: 'پرداخت سفارش',
    nextColor: textColors.warning
  },
  'Requested': {
    color: textColors.warning,
    fa: 'در حال بررسی',
    next: TXStatus.Accepted,
    nextFA: 'آماده سازی محصول',
    nextColor: textColors.orange
  },
  'Accepted': {
    color: textColors.orange,
    fa: 'تایید شده و در حال آماده سازی',
    next: TXStatus.Sent,
    nextFA: 'ارسال محصول',
    nextColor: textColors.info
  },
  'Sent': {
    color: textColors.info,
    fa: 'ارسال شده',
    next: TXStatus.Received,
    nextFA: 'دریافت توسط شما',
    nextColor: textColors.success
  },
  'Received': {
    color: textColors.success,
    fa: 'دریافت شده'
  },
  'Canceled': {
    color: textColors.destructive,
    fa: 'کنسل شده'
  },
}