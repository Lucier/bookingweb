import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getErrorMessage } from '../../api/errors'
import { MovingForm } from '../../components/moving/MovingForm'
import { useCreateMovement } from '../../hooks/useMoving'
import type { CreateMovementForm } from '../../schemas/moving.schema'

export function MovingCreate() {
  const navigate = useNavigate()
  const create = useCreateMovement()

  function handleSubmit(data: CreateMovementForm) {
    const payload: CreateMovementForm = {
      ...data,
      originSpaceId: data.originSpaceId || undefined,
      destinationSpaceId: data.destinationSpaceId || undefined,
    }

    create.mutate(payload, {
      onSuccess: async () => {
        await Swal.fire({
          icon: 'success',
          title: 'Movimentação registrada!',
          text: 'A movimentação foi cadastrada com sucesso.',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#2563eb',
        })
        navigate('/moving')
      },
      onError: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao registrar',
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
          to="/moving"
          className="mb-2 inline-block text-sm text-blue-600 hover:underline"
        >
          ← Voltar para lista
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Nova Movimentação</h1>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <MovingForm
          onSubmit={handleSubmit}
          isPending={create.isPending}
          error={create.error}
          submitLabel="Registrar movimentação"
        />
      </div>
    </div>
  )
}
