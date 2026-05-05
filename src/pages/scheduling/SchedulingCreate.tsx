import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getErrorMessage } from '../../api/errors'
import { SchedulingForm } from '../../components/scheduling/SchedulingForm'
import { useCreateScheduling } from '../../hooks/useScheduling'
import type { CreateSchedulingForm } from '../../schemas/scheduling.schema'

export function SchedulingCreate() {
  const navigate = useNavigate()
  const create = useCreateScheduling()

  function handleSubmit(data: CreateSchedulingForm) {
    create.mutate(data, {
      onSuccess: async () => {
        await Swal.fire({
          icon: 'success',
          title: 'Agendamento criado!',
          text: 'O agendamento foi registrado com sucesso.',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#2563eb',
        })
        navigate('/scheduling')
      },
      onError: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao criar',
          text: getErrorMessage(error),
          confirmButtonText: 'Fechar',
          confirmButtonColor: '#2563eb',
        })
      },
    })
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <Link
          to="/scheduling"
          className="mb-2 inline-block text-sm text-blue-600 hover:underline"
        >
          ← Voltar para lista
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Novo Agendamento</h1>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <SchedulingForm
          onSubmit={handleSubmit}
          isPending={create.isPending}
          error={create.error}
          submitLabel="Criar agendamento"
        />
      </div>
    </div>
  )
}
