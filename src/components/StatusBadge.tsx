const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: 'ATIVO', color: 'bg-green-100 text-green-800' },
  maintenance: { label: 'MANUTENÇÃO', color: 'bg-yellow-100 text-yellow-800' },
  inactive: { label: 'INATIVO', color: 'bg-gray-100 text-gray-700' },
  new: { label: 'NOVO', color: 'bg-blue-100 text-blue-800' },
  good: { label: 'BOM', color: 'bg-green-100 text-green-800' },
  regular: { label: 'REGULAR', color: 'bg-yellow-100 text-yellow-800' },
  downloaded: { label: 'BAIXADO', color: 'bg-gray-100 text-gray-700' },
  transfer: { label: 'TRANSFERÊNCIA', color: 'bg-blue-100 text-blue-800' },
  loan: { label: 'EMPRÉSTIMO', color: 'bg-purple-100 text-purple-800' },
  'write-off': { label: 'BAIXA', color: 'bg-red-100 text-red-800' },
}

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status]
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${config?.color ?? 'bg-gray-100 text-gray-700'}`}
    >
      {config?.label ?? status.toUpperCase()}
    </span>
  )
}
