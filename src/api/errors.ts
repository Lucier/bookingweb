import axios from 'axios'

export function getErrorMessage(error: unknown, fallback = 'Erro inesperado'): string {
  if (axios.isAxiosError(error)) {
    const msg = error.response?.data?.message
    if (Array.isArray(msg)) return msg.join(', ')
    if (typeof msg === 'string') return msg
    if (error.response?.status === 401) return 'Email ou senha incorretos'
    if (error.response?.status === 404) return 'Endpoint não encontrado'
    if (error.response?.status === 0 || !error.response) return 'Sem conexão com o servidor'
    return `Erro ${error.response?.status}`
  }
  return fallback
}
