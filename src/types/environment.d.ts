declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB_FILE_NAME: string;
    }
  }
}

export {};
