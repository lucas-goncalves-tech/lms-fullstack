"use client";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      typeof window !== "undefined" &&
      error.response?.status === 401 &&
      !window.location.pathname.startsWith("/auth")
    ) {
      window.location.href = "/auth";
    }

    if (
      typeof window !== "undefined" &&
      !window.location.pathname.startsWith("/auth") &&
      error.response?.status === 403
    ) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
