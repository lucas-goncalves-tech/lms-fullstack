import {
  zodIntegerValidator,
  zodNameValdiator,
  zodTitleValidator,
} from "@/lib/validators/common-fields";
import { zodSafeString } from "@/lib/validators/string.validator";
import z from "zod";

export const certificateSchema = z.object({
  id: z.uuid(),
  name: zodNameValdiator(),
  courseId: z.uuid(),
  title: zodTitleValidator(),
  totalSeconds: zodIntegerValidator(),
  totalLessons: zodIntegerValidator(),
  completed: zodSafeString(),
});

export type Certificate = z.infer<typeof certificateSchema>;
