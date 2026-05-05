import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { equipmentService } from '../api/equipment.service'
import type {
  CreateEquipmentForm,
  UpdateEquipmentForm,
} from '../schemas/equipment.schema'

const KEY = 'equipments'

export function useEquipments() {
  return useQuery({
    queryKey: [KEY],
    queryFn: equipmentService.list,
  })
}

export function useEquipment(id: string) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => equipmentService.findOne(id),
    enabled: !!id,
  })
}

export function useCreateEquipment() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateEquipmentForm) => equipmentService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}

export function useUpdateEquipment(id: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateEquipmentForm) =>
      equipmentService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}

export function useDeleteEquipment() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => equipmentService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}
