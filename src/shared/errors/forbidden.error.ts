import { ErrorBase } from "./base.error";

export class ForbiddenError extends ErrorBase {
  constructor(message = "Usuário sem permissão") {
    super(message, 403);
  }
}
