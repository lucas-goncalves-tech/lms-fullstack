export function envCheck() {
  const PORT = process.env.PORT;
  const DB_FILE_NAME = process.env.DB_FILE_NAME;
  const PEPPER = process.env.PEPPER;
  const ENV = process.env.NODE_ENV;

  if (!PORT) {
    throw new Error("Env PORT não foi definido");
  }

  if (!DB_FILE_NAME) {
    throw new Error("Env DB_FILE_NAME não foi definido");
  }

  if (!PEPPER) {
    throw new Error("Env PEPPER não foi definido");
  }

  if (!ENV) {
    throw new Error("Env NODE_ENV não foi definido");
  }

  return {
    PORT,
    DB_FILE_NAME,
    PEPPER,
    ENV,
  };
}
