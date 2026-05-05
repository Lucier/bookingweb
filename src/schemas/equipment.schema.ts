import { z } from 'zod'

export const conservationStatusEnum = z.enum([
  'new',
  'good',
  'regular',
  'maintenance',
  'downloaded',
])

export const createEquipmentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  serialNumber: z.string().min(1, 'Número de série é obrigatório'),
  description: z.string().optional(),
  manufacturer: z.string().optional(),
  model: z.string().optional(),
  category: z.string().optional(),
  conservationStatus: conservationStatusEnum.optional(),
  spaceId: z
    .string()
    .uuid('UUID inválido')
    .optional()
    .or(z.literal('')),
})

export const updateEquipmentSchema = createEquipmentSchema.partial().extend({
  spaceId: z.string().uuid('UUID inválido').nullable().optional().or(z.literal('')),
})

export const equipmentSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  manufacturer: z.string().nullable(),
  model: z.string().nullable(),
  serialNumber: z.string(),
  category: z.string().nullable(),
  conservationStatus: conservationStatusEnum,
  spaceId: z.string().uuid().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type CreateEquipmentForm = z.infer<typeof createEquipmentSchema>
export type UpdateEquipmentForm = z.infer<typeof updateEquipmentSchema>
export type Equipment = z.infer<typeof equipmentSchema>
