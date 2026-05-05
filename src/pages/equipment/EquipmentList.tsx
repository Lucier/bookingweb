import { Link } from 'react-router-dom'
import { useEquipments } from '../../hooks/useEquipments'
import { useAuthStore } from '../../hooks/useAuthStore'
import { EquipmentTable } from '../../components/equipment/EquipmentTable'
import { Button } from '../../components/Button'

export function EquipmentList() {
  const { user } = useAuthStore()
  const { data: equipments, isLoading } = useEquipments()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Equipamentos</h1>
          {equipments ? (
            <p className="mt-1 text-sm text-gray-500">
              {equipments.length} equipamento(s) cadastrado(s)
            </p>
          ) : null}
        </div>
        {user?.role === 'ADMIN' ? (
          <Link to="/equipments/new">
            <Button>+ Novo equipamento</Button>
          </Link>
        ) : null}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      ) : (
        <EquipmentTable equipments={equipments ?? []} />
      )}
    </div>
  )
}
