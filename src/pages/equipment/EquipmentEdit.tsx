import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEquipment, useUpdateEquipment } from '../../hooks/useEquipments'
import { EquipmentForm } from '../../components/equipment/EquipmentForm'
import { alertSuccess, alertError } from '../../utils/swal'
import type { CreateEquipmentForm } from '../../schemas/equipment.schema'

export function EquipmentEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: equipment, isLoading } = useEquipment(id!)
  const update = useUpdateEquipment(id!)

  async function handleSubmit(data: CreateEquipmentForm) {
    update.mutate(data, {
      onSuccess: async () => {
        await alertSuccess('Alterações salvas!', 'O equipamento foi atualizado com sucesso.')
        navigate('/equipments')
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

  if (!equipment) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-sm text-red-500">Equipamento não encontrado.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <Link
          to="/equipments"
          className="mb-2 inline-block text-sm text-blue-600 hover:underline"
        >
          ← Voltar para lista
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Editar Equipamento</h1>
        <p className="mt-1 text-sm text-gray-500">{equipment.name}</p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <EquipmentForm
          defaultValues={equipment}
          onSubmit={handleSubmit}
          isPending={update.isPending}
          error={update.error}
          submitLabel="Salvar alterações"
        />
      </div>
    </div>
  )
}
