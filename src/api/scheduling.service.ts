import { api } from './axios'
import type { Scheduling, CreateSchedulingForm } from '../schemas/scheduling.schema'

export const schedulingService = {
  list: () => api.get<Scheduling[]>('/scheduling').then((r) => r.data),

  findOne: (id: string) =>
    api.get<Scheduling>(`/scheduling/${id}`).then((r) => r.data),

  create: (data: CreateSchedulingForm) =>
    api.post<Scheduling>('/scheduling', data).then((r) => r.data),

  remove: (id: string) =>
    api.delete(`/scheduling/${id}`).then(() => undefined),
}
