import { CookieOptions } from "express";
import { envCheck } from "./env-check.helper";

export function sidCookieOptions(maxAge = 0): CookieOptions {
  return {
    httpOnly: true,
    secure: envCheck().NODE_ENV === "production",
    sameSite: envCheck().NODE_ENV === "production" ? "none" : "lax",
    maxAge: maxAge,
  };
}
