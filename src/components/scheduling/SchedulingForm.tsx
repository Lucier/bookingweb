import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createSchedulingSchema,
  type CreateSchedulingForm,
} from '../../schemas/scheduling.schema'
import { useSpaces } from '../../hooks/useSpaces'
import { getErrorMessage } from '../../api/errors'
import { Select } from '../Select'
import { Input } from '../Input'
import { Button } from '../Button'

interface Props {
  onSubmit: (data: CreateSchedulingForm) => void
  isPending: boolean
  error?: Error | null
  submitLabel: string
}

export function SchedulingForm({ onSubmit, isPending, error, submitLabel }: Props) {
  const { data: spaces, isLoading: loadingSpaces } = useSpaces()

  const spaceOptions =
    spaces?.map((s) => ({ value: s.id, label: s.name })) ?? []

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSchedulingForm>({
    resolver: zodResolver(createSchedulingSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Select
            label="Espaço *"
            error={errors.spaceId?.message}
            disabled={loadingSpaces}
            options={spaceOptions}
            {...register('spaceId')}
          />
        </div>
        <Input
          label="Data *"
          type="date"
          error={errors.schedulingDate?.message}
          {...register('schedulingDate')}
        />
        <Input
          label="Descrição da atividade *"
          error={errors.activityDescription?.message}
          {...register('activityDescription')}
        />
        <Input
          label="Hora início *"
          type="time"
          error={errors.startTime?.message}
          {...register('startTime')}
        />
        <Input
          label="Hora fim *"
          type="time"
          error={errors.endTime?.message}
          {...register('endTime')}
        />
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
