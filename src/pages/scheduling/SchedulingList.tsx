import { Link } from 'react-router-dom'
import { useSchedulings } from '../../hooks/useScheduling'
import { SchedulingTable } from '../../components/scheduling/SchedulingTable'
import { Button } from '../../components/Button'

export function SchedulingList() {
  const { data: schedulings, isLoading } = useSchedulings()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agendamentos</h1>
          {schedulings ? (
            <p className="mt-1 text-sm text-gray-500">
              {schedulings.length} agendamento(s) registrado(s)
            </p>
          ) : null}
        </div>
        <Link to="/scheduling/new">
          <Button>+ Novo agendamento</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      ) : (
        <SchedulingTable schedulings={schedulings ?? []} />
      )}
    </div>
  )
}
