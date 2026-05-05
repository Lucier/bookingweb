import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSpace, useUpdateSpace } from '../../hooks/useSpaces'
import { SpaceForm } from '../../components/space/SpaceForm'
import { alertSuccess, alertError } from '../../utils/swal'
import type { CreateSpaceForm } from '../../schemas/space.schema'

export function SpaceEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: space, isLoading } = useSpace(id!)
  const update = useUpdateSpace(id!)

  async function handleSubmit(data: CreateSpaceForm) {
    update.mutate(data, {
      onSuccess: async () => {
        await alertSuccess('Alterações salvas!', 'O espaço foi atualizado com sucesso.')
        navigate('/spaces')
      },
      onError: (error) => alertError(error, 'Erro ao salvar'),
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    )
  }

  if (!space) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-sm text-red-500">Espaço não encontrado.</p>
      </div>
    )
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
        <h1 className="text-2xl font-bold text-gray-900">Editar Espaço</h1>
        <p className="mt-1 text-sm text-gray-500">{space.name}</p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <SpaceForm
          defaultValues={space}
          onSubmit={handleSubmit}
          isPending={update.isPending}
          error={update.error}
          submitLabel="Salvar alterações"
        />
      </div>
    </div>
  )
}
