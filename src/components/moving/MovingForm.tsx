import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createMovementSchema,
  type CreateMovementForm,
} from '../../schemas/moving.schema'
import { useEquipments } from '../../hooks/useEquipments'
import { useSpaces } from '../../hooks/useSpaces'
import { getErrorMessage } from '../../api/errors'
import { Select } from '../Select'
import { Input } from '../Input'
import { Button } from '../Button'

const movementTypeOptions = [
  { value: 'transfer', label: 'Transferência' },
  { value: 'maintenance', label: 'Manutenção' },
  { value: 'loan', label: 'Empréstimo' },
  { value: 'write-off', label: 'Baixa' },
]

interface Props {
  onSubmit: (data: CreateMovementForm) => void
  isPending: boolean
  error?: Error | null
  submitLabel: string
}

export function MovingForm({ onSubmit, isPending, error, submitLabel }: Props) {
  const { data: equipments, isLoading: loadingEquipments } = useEquipments()
  const { data: spaces, isLoading: loadingSpaces } = useSpaces()

  const equipmentOptions =
    equipments?.map((e) => ({ value: e.id, label: e.name })) ?? []

  const spaceOptions =
    spaces?.map((s) => ({ value: s.id, label: s.name })) ?? []

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMovementForm>({
    resolver: zodResolver(createMovementSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Equipamento *"
          error={errors.equipmentId?.message}
          disabled={loadingEquipments}
          options={equipmentOptions}
          {...register('equipmentId')}
        />
        <Select
          label="Tipo de movimentação *"
          error={errors.movementType?.message}
          options={movementTypeOptions}
          {...register('movementType')}
        />
        <Select
          label="Espaço de origem"
          error={errors.originSpaceId?.message}
          disabled={loadingSpaces}
          options={spaceOptions}
          {...register('originSpaceId')}
        />
        <Select
          label="Espaço de destino"
          error={errors.destinationSpaceId?.message}
          disabled={loadingSpaces}
          options={spaceOptions}
          {...register('destinationSpaceId')}
        />
        <div className="sm:col-span-2">
          <Input
            label="Descrição"
            error={errors.description?.message}
            {...register('description')}
          />
        </div>
      </div>

      {error ? (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
          {getErrorMessage(error)}
        </p>
      ) : null}

      <div className="flex justify-end">
        <Button type="submit" loading={isPending}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
