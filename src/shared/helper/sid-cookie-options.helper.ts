import { CookieOptions } from "express";

export function sidCookieOptions(maxAge: number): CookieOptions {
  return {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: maxAge,
  };
}
