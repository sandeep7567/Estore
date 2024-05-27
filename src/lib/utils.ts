import { CartItem } from "@/redux/reducer/cartSlice";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJs from "crypto-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashTheItem(payload: CartItem): string {
  const jsonString = JSON.stringify({ ...payload, qty: undefined });

  const hash = CryptoJs.SHA256(jsonString).toString();

  return hash;
}
