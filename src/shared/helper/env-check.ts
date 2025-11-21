export function envCheck() {
  const PORT = process.env.PORT;
  const DB_FILE_NAME = process.env.DB_FILE_NAME;

  if (!PORT) {
    throw new Error("Env PORT não foi definido");
  }

  if (!DB_FILE_NAME) {
    throw new Error("Env DB_FILE_NAME não foi definido");
  }
  return {
    PORT,
    DB_FILE_NAME,
  };
}
