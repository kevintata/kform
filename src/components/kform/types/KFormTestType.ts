import { z } from "zod";

export const KFormTestType = z.object({
  names: z.array(z.string()),
});

export type KFormTestType = z.infer<typeof KFormTestType>;
