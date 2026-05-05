import { api } from './axios'
import type {
  Equipment,
  CreateEquipmentForm,
  UpdateEquipmentForm,
} from '../schemas/equipment.schema'

export const equipmentService = {
  list: () => api.get<Equipment[]>('/equipments').then((r) => r.data),

  findOne: (id: string) =>
    api.get<Equipment>(`/equipments/${id}`).then((r) => r.data),

  create: (data: CreateEquipmentForm) =>
    api.post<Equipment>('/equipments', data).then((r) => r.data),

  update: (id: string, data: UpdateEquipmentForm) =>
    api.patch<Equipment>(`/equipments/${id}`, data).then((r) => r.data),

  remove: (id: string) =>
    api.delete(`/equipments/${id}`).then(() => undefined),
}
