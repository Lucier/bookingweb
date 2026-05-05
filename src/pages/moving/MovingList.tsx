import { Link } from 'react-router-dom'
import { useMovements } from '../../hooks/useMoving'
import { useAuthStore } from '../../hooks/useAuthStore'
import { MovingTable } from '../../components/moving/MovingTable'
import { Button } from '../../components/Button'

export function MovingList() {
  const { user } = useAuthStore()
  const { data: movements, isLoading } = useMovements()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Movimentações de Equipamentos
          </h1>
          {movements ? (
            <p className="mt-1 text-sm text-gray-500">
              {movements.length} movimentação(ões) registrada(s)
            </p>
          ) : null}
        </div>
        {user?.role === 'ADMIN' ? (
          <Link to="/moving/new">
            <Button>+ Nova movimentação</Button>
          </Link>
        ) : null}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      ) : (
        <MovingTable movements={movements ?? []} />
      )}
    </div>
  )
}
