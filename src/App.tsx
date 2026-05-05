import { Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { ProtectedRoute } from './components/ProtectedRoute'
import { GuestRoute } from './components/GuestRoute'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { DashboardPage } from './pages/DashboardPage'
import { UsersPage } from './pages/UsersPage'
import { SchedulingList } from './pages/scheduling/SchedulingList'
import { SchedulingCreate } from './pages/scheduling/SchedulingCreate'
import { MovingList } from './pages/moving/MovingList'
import { MovingCreate } from './pages/moving/MovingCreate'
import { SpaceList } from './pages/space/SpaceList'
import { SpaceCreate } from './pages/space/SpaceCreate'
import { SpaceEdit } from './pages/space/SpaceEdit'
import { EquipmentList } from './pages/equipment/EquipmentList'
import { EquipmentCreate } from './pages/equipment/EquipmentCreate'
import { EquipmentEdit } from './pages/equipment/EquipmentEdit'
import { useAuthStore } from './hooks/useAuthStore'
import { useMe } from './hooks/useAuth'

function Layout({ children }: { children: React.ReactNode }) {
  useMe()
  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar />
      <div className="lg:pl-60">
        <div className="pt-14 lg:pt-0">
          <main>{children}</main>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const { accessToken } = useAuthStore()

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/spaces"
        element={
          <ProtectedRoute>
            <Layout>
              <SpaceList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/spaces/new"
        element={
          <ProtectedRoute adminOnly>
            <Layout>
              <SpaceCreate />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/spaces/:id/edit"
        element={
          <ProtectedRoute adminOnly>
            <Layout>
              <SpaceEdit />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/scheduling"
        element={
          <ProtectedRoute>
            <Layout>
              <SchedulingList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/scheduling/new"
        element={
          <ProtectedRoute>
            <Layout>
              <SchedulingCreate />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/moving"
        element={
          <ProtectedRoute>
            <Layout>
              <MovingList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/moving/new"
        element={
          <ProtectedRoute adminOnly>
            <Layout>
              <MovingCreate />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute adminOnly>
            <Layout>
              <UsersPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/equipments"
        element={
          <ProtectedRoute>
            <Layout>
              <EquipmentList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/equipments/new"
        element={
          <ProtectedRoute adminOnly>
            <Layout>
              <EquipmentCreate />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/equipments/:id/edit"
        element={
          <ProtectedRoute adminOnly>
            <Layout>
              <EquipmentEdit />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to={accessToken ? '/' : '/login'} replace />}
      />
    </Routes>
  )
}
