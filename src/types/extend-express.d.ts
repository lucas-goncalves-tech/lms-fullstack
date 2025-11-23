declare global {
  namespace Express {
    interface Request {
      session?: {
        userId: string;
        role: "ADMIN" | "USER";
      };
    }
  }
}

export {};
