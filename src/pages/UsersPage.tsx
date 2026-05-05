import { Trash2 } from 'lucide-react'
import { useAuthStore } from '../hooks/useAuthStore'
import { useDeleteUser, useUsers } from '../hooks/useUsers'
import type { User } from '../schemas/auth.schema'
import {
  alertDeleteError,
  alertDeleteSuccess,
  confirmDelete,
} from '../utils/swal'

export function UsersPage() {
  const { user: me } = useAuthStore()
  const isAdmin = me?.role === 'ADMIN'
  const { data: users, isLoading } = useUsers()
  const deleteUser = useDeleteUser()

  async function handleDelete(u: User) {
    const confirmed = await confirmDelete(`Excluir "${u.name}"?`)
    if (!confirmed) return

    deleteUser.mutate(u.id, {
      onSuccess: () =>
        alertDeleteSuccess(
          'Usuário excluído!',
          'O usuário foi removido com sucesso.',
        ),
      onError: (error) => alertDeleteError(error),
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Usuários</h1>

      {isLoading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : (
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Papel
                </th>
                {isAdmin ? <th className="px-6 py-3" /> : null}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users?.map((u) => (
                <tr key={u.id} className="hover:bg-blue-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {u.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{u.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        u.role === 'ADMIN'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  {isAdmin ? (
                    <td className="px-6 py-4">
                      {u.id !== me?.id && (
                        <div className="flex justify-end">
                          <button
                            title="Excluir"
                            onClick={() => handleDelete(u)}
                            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      )}
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
