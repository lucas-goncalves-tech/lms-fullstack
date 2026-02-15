import axios, { AxiosError } from "axios";

/**
 * Estrutura padrão de erro da API
 */
export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

/**
 * Type guard para verificar se é um erro do Axios
 */
export function isAxiosError(
  error: unknown
): error is AxiosError<ApiErrorResponse> {
  return axios.isAxiosError(error);
}

/**
 * Extrai a mensagem de erro de forma type-safe
 */
export function getErrorMessage(error: unknown): string {
  // Erro do Axios com resposta da API
  if (isAxiosError(error) && error.response?.data?.message) {
    return error.response.data.message;
  }

  // Erro do Axios sem resposta (timeout, network error)
  if (isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return "Tempo de requisição esgotado. Tente novamente.";
    }
    if (error.code === "ERR_NETWORK") {
      return "Erro de conexão. Verifique sua internet.";
    }
    return error.message;
  }

  // Erro genérico
  if (error instanceof Error) {
    return error.message;
  }

  return "Erro desconhecido. Tente novamente.";
}

/**
 * Extrai erros de validação (campo a campo)
 */
export function getValidationErrors(
  error: unknown
): Record<string, string[]> | null {
  if (isAxiosError(error) && error.response?.data?.errors) {
    return error.response.data.errors;
  }
  return null;
}
