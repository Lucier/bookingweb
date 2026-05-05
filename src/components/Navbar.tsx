import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Calendar,
  Building2,
  ArrowLeftRight,
  Package,
  Users,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useAuthStore } from '../hooks/useAuthStore'
import { useLogout } from '../hooks/useAuth'

function navClass(isActive: boolean) {
  return `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? 'bg-white/15 font-semibold text-white'
      : 'text-blue-200 hover:bg-white/10 hover:text-white'
  }`
}

export function Navbar() {
  const { user } = useAuthStore()
  const logout = useLogout()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isAdmin = user?.role === 'ADMIN'
  const close = () => setMobileOpen(false)
  const initials = user?.name?.charAt(0).toUpperCase() ?? '?'

  const links = (
    <nav className="flex-1 space-y-0.5 overflow-y-auto p-4">
      <NavLink to="/" end className={({ isActive }) => navClass(isActive)} onClick={close}>
        <LayoutDashboard size={18} />
        Início
      </NavLink>
      <NavLink to="/scheduling" className={({ isActive }) => navClass(isActive)} onClick={close}>
        <Calendar size={18} />
        Agendamentos
      </NavLink>
      {isAdmin ? (
        <>
          <NavLink to="/spaces" className={({ isActive }) => navClass(isActive)} onClick={close}>
            <Building2 size={18} />
            Espaços
          </NavLink>
          <NavLink to="/moving" className={({ isActive }) => navClass(isActive)} onClick={close}>
            <ArrowLeftRight size={18} />
            Movimentações
          </NavLink>
          <NavLink to="/equipments" className={({ isActive }) => navClass(isActive)} onClick={close}>
            <Package size={18} />
            Equipamentos
          </NavLink>
          <NavLink to="/users" className={({ isActive }) => navClass(isActive)} onClick={close}>
            <Users size={18} />
            Usuários
          </NavLink>
        </>
      ) : null}
    </nav>
  )

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-white/10 px-5">
        <Link to="/" className="text-xl font-bold text-white tracking-tight" onClick={close}>
          Booking
        </Link>
      </div>

      {links}

      <div className="border-t border-white/10 p-4">
        <div className="mb-3 flex items-center gap-3 px-1">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-blue-300">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-blue-200 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
        >
          <LogOut size={18} />
          {logout.isPending ? 'Saindo...' : 'Sair'}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center border-b border-gray-200 bg-white px-4 shadow-sm lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
        <Link to="/" className="ml-3 text-lg font-bold text-blue-600">
          Booking
        </Link>
      </div>

      {/* Mobile overlay */}
      {mobileOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={close}
        />
      ) : null}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-blue-950 transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          className="absolute right-3 top-3 rounded-lg p-1.5 text-blue-300 hover:bg-white/10 lg:hidden"
          onClick={close}
        >
          <X size={18} />
        </button>
        {sidebar}
      </aside>
    </>
  )
}
