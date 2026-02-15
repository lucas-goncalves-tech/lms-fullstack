import { zodIntegerValidator } from "@/lib/validators/common-fields";
import { zodSafeString } from "@/lib/validators/string.validator";
import z from "zod";

export const videoPathSchema = z.object({
  path: zodSafeString(),
  seconds: zodIntegerValidator(),
});
