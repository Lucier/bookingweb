import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '../../hooks/useAuthStore'
import { useDeleteScheduling } from '../../hooks/useScheduling'
import type { Scheduling } from '../../schemas/scheduling.schema'
import {
  alertDeleteError,
  alertDeleteSuccess,
  confirmDelete,
} from '../../utils/swal'

interface Props {
  schedulings: Scheduling[]
}

export function SchedulingTable({ schedulings }: Props) {
  const { user } = useAuthStore()
  const deleteScheduling = useDeleteScheduling()
  const [search, setSearch] = useState('')

  const filtered = schedulings.filter((s) => {
    const q = search.toLowerCase()
    return (
      (s.spaceName?.toLowerCase().includes(q) ?? false) ||
      (s.userName?.toLowerCase().includes(q) ?? false) ||
      s.activityDescription.toLowerCase().includes(q) ||
      s.schedulingDate.includes(q)
    )
  })

  function canDelete(s: Scheduling) {
    return user?.role === 'ADMIN' || s.userId === user?.id
  }

  async function handleDelete(s: Scheduling) {
    const confirmed = await confirmDelete('Excluir agendamento?')
    if (!confirmed) return

    deleteScheduling.mutate(s.id, {
      onSuccess: () =>
        alertDeleteSuccess(
          'Agendamento excluído!',
          'O agendamento foi removido com sucesso.',
        ),
      onError: (error) => alertDeleteError(error),
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por espaço, usuário, atividade ou data..."
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 sm:max-w-md"
      />

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Espaço
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Usuário
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Data
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Horário
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Atividade
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-gray-400"
                  >
                    {search
                      ? 'Nenhum agendamento encontrado para a busca.'
                      : 'Nenhum agendamento cadastrado.'}
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-blue-50/50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {s.spaceName ?? s.spaceId}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {s.userName ?? s.userId}
                    </td>
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
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        {canDelete(s) ? (
                          <button
                            title="Excluir"
                            onClick={() => handleDelete(s)}
                            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={20} />
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length > 0 && search ? (
        <p className="text-xs text-gray-400">
          {filtered.length} de {schedulings.length} agendamento(s)
        </p>
      ) : null}
    </div>
  )
}
