import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../hooks/useAuthStore'
import { useDeleteEquipment } from '../../hooks/useEquipments'
import type { Equipment } from '../../schemas/equipment.schema'
import {
  alertDeleteError,
  alertDeleteSuccess,
  confirmDelete,
} from '../../utils/swal'
import { StatusBadge } from '../StatusBadge'

interface Props {
  equipments: Equipment[]
}

export function EquipmentTable({ equipments }: Props) {
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'ADMIN'
  const navigate = useNavigate()
  const deleteEquipment = useDeleteEquipment()
  const [search, setSearch] = useState('')

  const filtered = equipments.filter((e) => {
    const q = search.toLowerCase()
    return (
      e.name.toLowerCase().includes(q) ||
      e.serialNumber.toLowerCase().includes(q) ||
      (e.manufacturer?.toLowerCase().includes(q) ?? false) ||
      (e.category?.toLowerCase().includes(q) ?? false) ||
      (e.model?.toLowerCase().includes(q) ?? false)
    )
  })

  async function handleDelete(eq: Equipment) {
    const confirmed = await confirmDelete(`Excluir "${eq.name}"?`)
    if (!confirmed) return

    deleteEquipment.mutate(eq.id, {
      onSuccess: () =>
        alertDeleteSuccess(
          'Equipamento excluído!',
          'O equipamento foi removido com sucesso.',
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
        placeholder="Buscar por nome, série, fabricante, modelo ou categoria..."
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
                  Série
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Fabricante
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Modelo
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Categoria
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Estado
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
                    colSpan={isAdmin ? 7 : 6}
                    className="px-4 py-10 text-center text-sm text-gray-400"
                  >
                    {search
                      ? 'Nenhum equipamento encontrado para a busca.'
                      : 'Nenhum equipamento cadastrado.'}
                  </td>
                </tr>
              ) : (
                filtered.map((eq) => (
                  <tr key={eq.id} className="hover:bg-blue-50/50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {eq.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">
                      {eq.serialNumber}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {eq.manufacturer ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {eq.model ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {eq.category ?? '—'}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={eq.conservationStatus} />
                    </td>
                    {isAdmin ? (
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <button
                            title="Editar"
                            onClick={() =>
                              navigate(`/equipments/${eq.id}/edit`)
                            }
                            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Pencil size={20} />
                          </button>
                          <button
                            title="Excluir"
                            onClick={() => handleDelete(eq)}
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
          {filtered.length} de {equipments.length} equipamento(s)
        </p>
      ) : null}
    </div>
  )
}
