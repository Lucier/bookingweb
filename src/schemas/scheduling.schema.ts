import { z } from 'zod'

export const createSchedulingSchema = z.object({
  spaceId: z.string().uuid('Selecione um espaço'),
  activityDescription: z.string().min(1, 'Descrição é obrigatória'),
  schedulingDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use o formato YYYY-MM-DD'),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Use o formato HH:mm'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Use o formato HH:mm'),
})

export const schedulingSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  spaceId: z.string().uuid(),
  activityDescription: z.string(),
  schedulingDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  spaceName: z.string().optional(),
  userName: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type CreateSchedulingForm = z.infer<typeof createSchedulingSchema>
export type Scheduling = z.infer<typeof schedulingSchema>
