import { CookieOptions } from "express";

export function sidCookieOptions(maxAge = 0): CookieOptions {
  return {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: maxAge,
  };
}
