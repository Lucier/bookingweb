import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../api/axios'
import type { User } from '../schemas/auth.schema'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => api.get<User[]>('/users').then((r) => r.data),
  })
}

export function useDeleteUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/users/${id}`).then(() => undefined),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  })
}
