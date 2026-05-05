import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getErrorMessage } from '../../api/errors'
import { EquipmentForm } from '../../components/equipment/EquipmentForm'
import { useCreateEquipment } from '../../hooks/useEquipments'
import type { CreateEquipmentForm } from '../../schemas/equipment.schema'

export function EquipmentCreate() {
  const navigate = useNavigate()
  const create = useCreateEquipment()

  function handleSubmit(data: CreateEquipmentForm) {
    create.mutate(data, {
      onSuccess: async () => {
        await Swal.fire({
          icon: 'success',
          title: 'Equipamento criado!',
          text: 'O equipamento foi cadastrado com sucesso.',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#2563eb',
        })
        navigate('/equipments')
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
          to="/equipments"
          className="mb-2 inline-block text-sm text-blue-600 hover:underline"
        >
          ← Voltar para lista
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Novo Equipamento</h1>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <EquipmentForm
          onSubmit={handleSubmit}
          isPending={create.isPending}
          error={create.error}
          submitLabel="Criar equipamento"
        />
      </div>
    </div>
  )
}
