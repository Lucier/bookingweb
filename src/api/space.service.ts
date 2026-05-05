import { api } from './axios'
import type {
  Space,
  CreateSpaceForm,
  UpdateSpaceForm,
} from '../schemas/space.schema'

export const spaceService = {
  list: () => api.get<Space[]>('/spaces').then((r) => r.data),

  findOne: (id: string) =>
    api.get<Space>(`/spaces/${id}`).then((r) => r.data),

  create: (data: CreateSpaceForm) =>
    api.post<Space>('/spaces', data).then((r) => r.data),

  update: (id: string, data: UpdateSpaceForm) =>
    api.patch<Space>(`/spaces/${id}`, data).then((r) => r.data),

  remove: (id: string) =>
    api.delete(`/spaces/${id}`).then(() => undefined),
}
