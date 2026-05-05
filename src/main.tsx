import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import App from './App'
import { useAuthStore } from './hooks/useAuthStore'

function AdminDevtools() {
  const user = useAuthStore((s) => s.user)
  if (user?.role !== 'ADMIN') return null
  return <ReactQueryDevtools />
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <AdminDevtools />
    </QueryClientProvider>
  </StrictMode>,
)
