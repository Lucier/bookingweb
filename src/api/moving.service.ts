import { api } from './axios'
import type { Movement, CreateMovementForm } from '../schemas/moving.schema'

export const movingService = {
  list: () => api.get<Movement[]>('/moving').then((r) => r.data),

  findOne: (id: string) =>
    api.get<Movement>(`/moving/${id}`).then((r) => r.data),

  create: (data: CreateMovementForm) =>
    api.post<Movement>('/moving', data).then((r) => r.data),

  remove: (id: string) =>
    api.delete(`/moving/${id}`).then(() => undefined),
}
