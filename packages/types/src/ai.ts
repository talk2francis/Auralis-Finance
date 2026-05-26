import { z } from "zod";

export const AIProvenanceSchema = z.object({
  modelId: z.string().min(1),
  methodologyVersion: z.number().int().positive(),
  inputVector: z.record(z.string(), z.unknown()),
  promptHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  responseHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  cached: z.boolean(),
  generatedAt: z.string().datetime(),
});
export type AIProvenance = z.infer<typeof AIProvenanceSchema>;
