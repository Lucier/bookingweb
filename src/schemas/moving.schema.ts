import { z } from 'zod'

export const movementTypeEnum = z.enum([
  'transfer',
  'maintenance',
  'loan',
  'write-off',
])

export const createMovementSchema = z.object({
  equipmentId: z.string().uuid('Equipamento inválido'),
  originSpaceId: z.string().uuid().optional().or(z.literal('')),
  destinationSpaceId: z.string().uuid().optional().or(z.literal('')),
  movementType: movementTypeEnum,
  description: z.string().optional(),
  movementDate: z.string().optional(),
})

export const movementSchema = z.object({
  id: z.string().uuid(),
  equipmentId: z.string().uuid(),
  userId: z.string().uuid(),
  originSpaceId: z.string().uuid().nullable(),
  destinationSpaceId: z.string().uuid().nullable(),
  movementType: movementTypeEnum,
  description: z.string().nullable(),
  movementDate: z.string(),
  equipmentName: z.string().optional(),
  originSpaceName: z.string().nullable().optional(),
  destinationSpaceName: z.string().nullable().optional(),
  createdAt: z.string(),
})

export type CreateMovementForm = z.infer<typeof createMovementSchema>
export type Movement = z.infer<typeof movementSchema>
