import { Link } from 'react-router-dom'
import { StatusBadge } from '../components/StatusBadge'
import { useMe } from '../hooks/useAuth'
import { useAuthStore } from '../hooks/useAuthStore'
import { useEquipments } from '../hooks/useEquipments'
import { useMovements } from '../hooks/useMoving'
import { useSchedulings } from '../hooks/useScheduling'
import { useSpaces } from '../hooks/useSpaces'
import { useUsers } from '../hooks/useUsers'

function StatCard({
  label,
  value,
  color,
}: {
  label: string
  value: number | string | undefined
  color: 'blue' | 'green' | 'purple' | 'orange' | 'indigo'
}) {
  const accents = {
    blue: 'border-blue-600',
    green: 'border-blue-400',
    purple: 'border-slate-400',
    orange: 'border-gray-400',
    indigo: 'border-blue-800',
  }
  return (
    <div
      className={`rounded-xl border-t-4 bg-white p-6 shadow-sm ${accents[color]}`}
    >
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-gray-900">{value ?? '—'}</p>
    </div>
  )
}

function SchedulingMiniTable({
  schedulings,
  showUser = false,
}: {
  schedulings: ReturnType<typeof useSchedulings>['data']
  showUser?: boolean
}) {
  const rows = [...(schedulings ?? [])]
    .sort((a, b) => b.schedulingDate.localeCompare(a.schedulingDate))
    .slice(0, 8)

  const colSpan = showUser ? 5 : 4

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Agendamentos</h2>
        <Link
          to="/scheduling"
          className="text-sm text-blue-600 hover:underline"
        >
          Ver todos →
        </Link>
      </div>
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Espaço
                </th>
                {showUser && (
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                    Usuário
                  </th>
                )}
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Data
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Horário
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Atividade
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={colSpan}
                    className="px-4 py-8 text-center text-sm text-gray-400"
                  >
                    Nenhum agendamento registrado.
                  </td>
                </tr>
              ) : (
                rows.map((s) => (
                  <tr key={s.id} className="hover:bg-blue-50/50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {s.spaceName ?? s.spaceId}
                    </td>
                    {showUser && (
                      <td className="px-4 py-3 text-gray-500">
                        {s.userName ?? '—'}
                      </td>
                    )}
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(
                        s.schedulingDate + 'T00:00:00',
                      ).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {s.startTime} – {s.endTime}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {s.activityDescription}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AdminDashboard() {
  const { data: spaces } = useSpaces()
  const { data: users } = useUsers()
  const { data: schedulings } = useSchedulings()
  const { data: movements } = useMovements()
  const { data: equipments } = useEquipments()

  const recentMovements = [...(movements ?? [])]
    .sort((a, b) => b.movementDate.localeCompare(a.movementDate))
    .slice(0, 8)

  return (
    <>
      <div className="mb-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard
          label="Espaços cadastrados"
          value={spaces?.length}
          color="blue"
        />
        <StatCard
          label="Usuários cadastrados"
          value={users?.length}
          color="green"
        />
        <StatCard
          label="Agendamentos"
          value={schedulings?.length}
          color="purple"
        />
        <StatCard
          label="Equipamentos cadastrados"
          value={equipments?.length}
          color="orange"
        />
        <StatCard
          label="Movimentações"
          value={movements?.length}
          color="indigo"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <SchedulingMiniTable schedulings={schedulings} showUser />

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Movimentações de equipamentos
            </h2>
            <Link
              to="/moving"
              className="text-sm text-blue-600 hover:underline"
            >
              Ver todos →
            </Link>
          </div>
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                      Equipamento
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                      Tipo
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                      Destino
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentMovements.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-sm text-gray-400"
                      >
                        Nenhuma movimentação registrada.
                      </td>
                    </tr>
                  ) : (
                    recentMovements.map((m) => (
                      <tr key={m.id} className="hover:bg-blue-50/50">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {m.equipmentName ?? m.equipmentId}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={m.movementType} />
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                          {m.destinationSpaceName ?? '—'}
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                          {new Date(m.movementDate).toLocaleDateString('pt-BR')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function UserDashboard() {
  const { data: schedulings } = useSchedulings()
  return <SchedulingMiniTable schedulings={schedulings} />
}

export function DashboardPage() {
  const { data: me } = useMe()
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'ADMIN'

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-bold text-gray-900">
        Olá, {me?.name ?? user?.name ?? '...'}!
      </h1>
      <p className="mb-8 text-gray-500">Bem-vindo ao sistema de agendamento</p>

      {isAdmin ? <AdminDashboard /> : <UserDashboard />}
    </div>
  )
}
