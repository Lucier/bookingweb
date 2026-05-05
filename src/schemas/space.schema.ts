import { z } from 'zod'

export const spaceStatusEnum = z.enum(['active', 'maintenance', 'inactive'])

export const createSpaceSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  status: spaceStatusEnum.optional(),
})

export const updateSpaceSchema = createSpaceSchema.partial()

export const spaceSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  status: spaceStatusEnum,
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type CreateSpaceForm = z.infer<typeof createSpaceSchema>
export type UpdateSpaceForm = z.infer<typeof updateSpaceSchema>
export type Space = z.infer<typeof spaceSchema>
