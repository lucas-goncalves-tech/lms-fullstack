import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { SID_IDENTIFIER } from "../shared/constants/sid-identifier.constants";

const registry = new OpenAPIRegistry();

registry.registerComponent("securitySchemes", "cookieAuth", {
  type: "apiKey",
  in: "cookie",
  name: SID_IDENTIFIER,
  description: "JWT access token enviado automaticamente via cookie HTTP-only",
});

export default registry;
