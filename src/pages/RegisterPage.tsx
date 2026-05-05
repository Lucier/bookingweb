import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { getErrorMessage } from '../api/errors'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { useRegister } from '../hooks/useAuth'
import { registerSchema, type RegisterForm } from '../schemas/auth.schema'

export function RegisterPage() {
  const register_ = useRegister()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="bg-blue-600 px-8 py-6">
          <p className="text-xl font-bold text-white">Booking</p>
          <p className="mt-0.5 text-sm text-blue-100">
            Sistema de agendamento de espaços
          </p>
        </div>
        <div className="p-8">
          <h1 className="mb-6 text-xl font-bold text-gray-900">Criar conta</h1>
          <form
            onSubmit={handleSubmit((data) => register_.mutate(data))}
            className="flex flex-col gap-4"
          >
            <Input
              label="Nome"
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              label="Email"
              type="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Senha"
              type="password"
              error={errors.password?.message}
              {...register('password')}
            />
            {register_.error ? (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {getErrorMessage(register_.error)}
              </p>
            ) : null}
            <Button
              type="submit"
              loading={register_.isPending}
              className="mt-1 w-full"
            >
              Criar conta
            </Button>
            <p className="text-center text-sm text-gray-500">
              Já tem conta?{' '}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Entrar
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
