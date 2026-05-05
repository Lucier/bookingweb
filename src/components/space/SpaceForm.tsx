import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createSpaceSchema,
  type CreateSpaceForm,
  type Space,
} from '../../schemas/space.schema'
import { getErrorMessage } from '../../api/errors'
import { Input } from '../Input'
import { Select } from '../Select'
import { Button } from '../Button'

const statusOptions = [
  { value: 'active', label: 'Ativo' },
  { value: 'maintenance', label: 'Em manutenção' },
  { value: 'inactive', label: 'Inativo' },
]

interface Props {
  defaultValues?: Space
  onSubmit: (data: CreateSpaceForm) => void
  isPending: boolean
  error?: Error | null
  submitLabel: string
}

export function SpaceForm({
  defaultValues,
  onSubmit,
  isPending,
  error,
  submitLabel,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateSpaceForm>({
    resolver: zodResolver(createSpaceSchema),
  })

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name,
        description: defaultValues.description ?? '',
        status: defaultValues.status,
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
        <Select
          label="Status"
          error={errors.status?.message}
          options={statusOptions}
          {...register('status')}
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
