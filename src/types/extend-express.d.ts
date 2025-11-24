declare global {
  namespace Express {
    interface Request {
      session?: {
        role: "ADMIN" | "USER";
        name: string;
        email: string;
      };
    }
  }
}

export {};
