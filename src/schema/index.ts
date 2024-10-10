import { z } from "zod";

export const splittestSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(5000),
  tags: z.string().min(1),
})

