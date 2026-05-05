import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getErrorMessage } from '../../api/errors'
import { SpaceForm } from '../../components/space/SpaceForm'
import { useCreateSpace } from '../../hooks/useSpaces'
import type { CreateSpaceForm } from '../../schemas/space.schema'

export function SpaceCreate() {
  const navigate = useNavigate()
  const create = useCreateSpace()

  function handleSubmit(data: CreateSpaceForm) {
    create.mutate(data, {
      onSuccess: async () => {
        await Swal.fire({
          icon: 'success',
          title: 'Espaço criado!',
          text: 'O espaço foi cadastrado com sucesso.',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#2563eb',
        })
        navigate('/spaces')
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
          to="/spaces"
          className="mb-2 inline-block text-sm text-blue-600 hover:underline"
        >
          ← Voltar para lista
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Novo Espaço</h1>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <SpaceForm
          onSubmit={handleSubmit}
          isPending={create.isPending}
          error={create.error}
          submitLabel="Criar espaço"
        />
      </div>
    </div>
  )
}
