import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { spaceService } from '../api/space.service'
import type {
  CreateSpaceForm,
  UpdateSpaceForm,
} from '../schemas/space.schema'

const KEY = 'spaces'

export function useSpaces() {
  return useQuery({
    queryKey: [KEY],
    queryFn: spaceService.list,
  })
}

export function useSpace(id: string) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => spaceService.findOne(id),
    enabled: !!id,
  })
}

export function useCreateSpace() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateSpaceForm) => spaceService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}

export function useUpdateSpace(id: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateSpaceForm) => spaceService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}

export function useDeleteSpace() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => spaceService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}
