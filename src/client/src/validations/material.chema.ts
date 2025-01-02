import { z } from "zod";

export const MaterialRes = z.object({
    materialId: z.number(),
    materialName: z.string(),
});

export type MaterialRes = z.infer<typeof MaterialRes>;