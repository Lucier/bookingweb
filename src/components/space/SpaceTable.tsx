import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../hooks/useAuthStore'
import { useDeleteSpace } from '../../hooks/useSpaces'
import type { Space } from '../../schemas/space.schema'
import {
  alertDeleteError,
  alertDeleteSuccess,
  confirmDelete,
} from '../../utils/swal'
import { StatusBadge } from '../StatusBadge'

interface Props {
  spaces: Space[]
}

export function SpaceTable({ spaces }: Props) {
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'ADMIN'
  const navigate = useNavigate()
  const deleteSpace = useDeleteSpace()
  const [search, setSearch] = useState('')

  const filtered = spaces.filter((s) => {
    const q = search.toLowerCase()
    return (
      s.name.toLowerCase().includes(q) ||
      (s.description?.toLowerCase().includes(q) ?? false)
    )
  })

  async function handleDelete(space: Space) {
    const confirmed = await confirmDelete(`Excluir "${space.name}"?`)
    if (!confirmed) return

    deleteSpace.mutate(space.id, {
      onSuccess: () =>
        alertDeleteSuccess(
          'Espaço excluído!',
          'O espaço foi removido com sucesso.',
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
        placeholder="Buscar por nome ou descrição..."
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 sm:max-w-md"
      />

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Nome
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Descrição
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Status
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
                    colSpan={isAdmin ? 4 : 3}
                    className="px-4 py-10 text-center text-sm text-gray-400"
                  >
                    {search
                      ? 'Nenhum espaço encontrado para a busca.'
                      : 'Nenhum espaço cadastrado.'}
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-blue-50/50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {s.name}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {s.description ?? '—'}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={s.status} />
                    </td>
                    {isAdmin ? (
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <button
                            title="Editar"
                            onClick={() => navigate(`/spaces/${s.id}/edit`)}
                            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Pencil size={20} />
                          </button>
                          <button
                            title="Excluir"
                            onClick={() => handleDelete(s)}
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
          {filtered.length} de {spaces.length} espaço(s)
        </p>
      ) : null}
    </div>
  )
}
