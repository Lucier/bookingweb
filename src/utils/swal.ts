import Swal from 'sweetalert2'
import { getErrorMessage } from '../api/errors'

const PRIMARY = '#2563eb'
const DANGER = '#dc2626'
const CANCEL = '#6b7280'

export async function confirmDelete(title: string, text = 'Esta ação não pode ser desfeita.'): Promise<boolean> {
  const result = await Swal.fire({
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: DANGER,
    cancelButtonColor: CANCEL,
    reverseButtons: true,
  })
  return result.isConfirmed
}

export function alertDeleteSuccess(title = 'Excluído com sucesso!', text?: string) {
  return Swal.fire({
    icon: 'success',
    title,
    text,
    confirmButtonText: 'Ok',
    confirmButtonColor: PRIMARY,
    timer: 2000,
    timerProgressBar: true,
  })
}

export function alertDeleteError(error: unknown) {
  return Swal.fire({
    icon: 'warning',
    title: 'Não foi possível excluir',
    text: getErrorMessage(error),
    confirmButtonText: 'Fechar',
    confirmButtonColor: PRIMARY,
  })
}

export function alertSuccess(title: string, text?: string) {
  return Swal.fire({
    icon: 'success',
    title,
    text,
    confirmButtonText: 'Ok',
    confirmButtonColor: PRIMARY,
  })
}

export function alertError(error: unknown, title = 'Erro ao salvar') {
  return Swal.fire({
    icon: 'error',
    title,
    text: getErrorMessage(error),
    confirmButtonText: 'Fechar',
    confirmButtonColor: PRIMARY,
  })
}
