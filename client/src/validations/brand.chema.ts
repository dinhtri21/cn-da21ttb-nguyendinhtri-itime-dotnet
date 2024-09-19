import { z } from "zod";

export const BrandRes = z.object({
  brandId: z.number(),
  brandName: z.string(),
  brandDescription: z.string(),
  
});

export type BrandRes = z.infer<typeof BrandRes>;