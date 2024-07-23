import {genres} from "@/helpers/types";
import type {GenreKeys } from "@/helpers/types";

export const roundRates = (num: number) => {
  return Math.round(num * 10) / 10
}

export const joinGenres = (arr: GenreKeys[]) => {
  return arr.map(el => genres[el]).join(', ')
}

export const setRuntime = (time: number) => {
  const h = Math.floor(time / 60)
  const m = time % 60
  return `${h}ч ${m.toString().padStart(2, '0')}м`
}

export const toMoney = (str: string | number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0 // Устанавливаем минимум 0 знаков после запятой
  });
  return formatter.format(+str)
}