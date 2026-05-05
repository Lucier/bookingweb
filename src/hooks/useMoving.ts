import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { movingService } from '../api/moving.service'
import type { CreateMovementForm } from '../schemas/moving.schema'

const KEY = 'movements'

export function useMovements() {
  return useQuery({
    queryKey: [KEY],
    queryFn: movingService.list,
  })
}

export function useMovement(id: string) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => movingService.findOne(id),
    enabled: !!id,
  })
}

export function useCreateMovement() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateMovementForm) => movingService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}

export function useDeleteMovement() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => movingService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}
