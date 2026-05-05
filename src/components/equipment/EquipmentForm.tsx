import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createEquipmentSchema,
  type CreateEquipmentForm,
  type Equipment,
} from '../../schemas/equipment.schema'
import { useSpaces } from '../../hooks/useSpaces'
import { getErrorMessage } from '../../api/errors'
import { Input } from '../Input'
import { Select } from '../Select'
import { Button } from '../Button'

const conservationOptions = [
  { value: 'new', label: 'Novo' },
  { value: 'good', label: 'Bom' },
  { value: 'regular', label: 'Regular' },
  { value: 'maintenance', label: 'Em manutenção' },
  { value: 'downloaded', label: 'Baixado' },
]

interface Props {
  defaultValues?: Equipment
  onSubmit: (data: CreateEquipmentForm) => void
  isPending: boolean
  error?: Error | null
  submitLabel: string
}

export function EquipmentForm({
  defaultValues,
  onSubmit,
  isPending,
  error,
  submitLabel,
}: Props) {
  const { data: spaces, isLoading: loadingSpaces } = useSpaces()
  const spaceOptions =
    spaces?.map((s) => ({ value: s.id, label: s.name })) ?? []

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateEquipmentForm>({
    resolver: zodResolver(createEquipmentSchema),
  })

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name,
        serialNumber: defaultValues.serialNumber,
        description: defaultValues.description ?? '',
        manufacturer: defaultValues.manufacturer ?? '',
        model: defaultValues.model ?? '',
        category: defaultValues.category ?? '',
        conservationStatus: defaultValues.conservationStatus,
        spaceId: defaultValues.spaceId ?? '',
      })
    }
  }, [defaultValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Nome *"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Número de série *"
          error={errors.serialNumber?.message}
          {...register('serialNumber')}
        />
        <Input
          label="Fabricante"
          error={errors.manufacturer?.message}
          {...register('manufacturer')}
        />
        <Input
          label="Modelo"
          error={errors.model?.message}
          {...register('model')}
        />
        <Input
          label="Categoria"
          error={errors.category?.message}
          {...register('category')}
        />
        <Select
          label="Estado de conservação"
          error={errors.conservationStatus?.message}
          options={conservationOptions}
          {...register('conservationStatus')}
        />
        <div className="sm:col-span-2">
          <Input
            label="Descrição"
            error={errors.description?.message}
            {...register('description')}
          />
        </div>
        <div className="sm:col-span-2">
          <Select
            label="Espaço"
            error={errors.spaceId?.message}
            disabled={loadingSpaces}
            options={spaceOptions}
            {...register('spaceId')}
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
