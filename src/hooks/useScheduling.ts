import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { schedulingService } from '../api/scheduling.service'
import type { CreateSchedulingForm } from '../schemas/scheduling.schema'

const KEY = 'schedulings'

export function useSchedulings() {
  return useQuery({
    queryKey: [KEY],
    queryFn: schedulingService.list,
  })
}

export function useScheduling(id: string) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => schedulingService.findOne(id),
    enabled: !!id,
  })
}

export function useCreateScheduling() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateSchedulingForm) => schedulingService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}

export function useDeleteScheduling() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => schedulingService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}
