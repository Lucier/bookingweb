import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '../../hooks/useAuthStore'
import { useDeleteMovement } from '../../hooks/useMoving'
import type { Movement } from '../../schemas/moving.schema'
import {
  alertDeleteError,
  alertDeleteSuccess,
  confirmDelete,
} from '../../utils/swal'
import { StatusBadge } from '../StatusBadge'

interface Props {
  movements: Movement[]
}

export function MovingTable({ movements }: Props) {
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'ADMIN'
  const deleteMovement = useDeleteMovement()
  const [search, setSearch] = useState('')

  const filtered = movements.filter((m) => {
    const q = search.toLowerCase()
    return (
      (m.equipmentName?.toLowerCase().includes(q) ?? false) ||
      m.movementType.toLowerCase().includes(q) ||
      (m.originSpaceName?.toLowerCase().includes(q) ?? false) ||
      (m.destinationSpaceName?.toLowerCase().includes(q) ?? false)
    )
  })

  async function handleDelete(m: Movement) {
    const label = m.equipmentName ?? m.equipmentId
    const confirmed = await confirmDelete(`Excluir movimentação de "${label}"?`)
    if (!confirmed) return

    deleteMovement.mutate(m.id, {
      onSuccess: () =>
        alertDeleteSuccess(
          'Movimentação excluída!',
          'A movimentação foi removida com sucesso.',
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
        placeholder="Buscar por equipamento, tipo, origem ou destino..."
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 sm:max-w-md"
      />

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
                  Origem
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Destino
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Data
                </th>
                {isAdmin ? (
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-blue-800">
                    Ações
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={isAdmin ? 6 : 5}
                    className="px-4 py-10 text-center text-sm text-gray-400"
                  >
                    {search
                      ? 'Nenhuma movimentação encontrada para a busca.'
                      : 'Nenhuma movimentação cadastrada.'}
                  </td>
                </tr>
              ) : (
                filtered.map((m) => (
                  <tr key={m.id} className="hover:bg-blue-50/50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {m.equipmentName ?? m.equipmentId}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={m.movementType} />
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {m.originSpaceName ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {m.destinationSpaceName ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(m.movementDate).toLocaleDateString('pt-BR')}
                    </td>
                    {isAdmin ? (
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <button
                            title="Excluir"
                            onClick={() => handleDelete(m)}
                            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    ) : null}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length > 0 && search ? (
        <p className="text-xs text-gray-400">
          {filtered.length} de {movements.length} movimentação(ões)
        </p>
      ) : null}
    </div>
  )
}
