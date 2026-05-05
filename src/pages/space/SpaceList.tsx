import { Link } from 'react-router-dom'
import { useSpaces } from '../../hooks/useSpaces'
import { useAuthStore } from '../../hooks/useAuthStore'
import { SpaceTable } from '../../components/space/SpaceTable'
import { Button } from '../../components/Button'

export function SpaceList() {
  const { user } = useAuthStore()
  const { data: spaces, isLoading } = useSpaces()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Espaços</h1>
          {spaces ? (
            <p className="mt-1 text-sm text-gray-500">
              {spaces.length} espaço(s) cadastrado(s)
            </p>
          ) : null}
        </div>
        {user?.role === 'ADMIN' ? (
          <Link to="/spaces/new">
            <Button>+ Novo espaço</Button>
          </Link>
        ) : null}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      ) : (
        <SpaceTable spaces={spaces ?? []} />
      )}
    </div>
  )
}
