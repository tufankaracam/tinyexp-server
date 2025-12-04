import * as z from 'zod';

export const IdParamSchema = z.object({
    id: z.string().regex(/^\d+$/, 'ID must be numeric').transform(Number)
})

export type IdParamRequest = z.infer<typeof IdParamSchema>;