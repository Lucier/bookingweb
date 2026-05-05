import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { getErrorMessage } from '../api/errors'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { useLogin } from '../hooks/useAuth'
import { loginSchema, type LoginForm } from '../schemas/auth.schema'

export function LoginPage() {
  const login = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
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
          <h1 className="mb-6 text-xl font-bold text-gray-900">
            Entrar na sua conta
          </h1>
          <form
            onSubmit={handleSubmit((data) => login.mutate(data))}
            className="flex flex-col gap-4"
          >
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
            {login.error ? (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {getErrorMessage(login.error)}
              </p>
            ) : null}
            <Button
              type="submit"
              loading={login.isPending}
              className="mt-1 w-full"
            >
              Entrar
            </Button>
            <p className="text-center text-sm text-gray-500">
              Não tem conta?{' '}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:underline"
              >
                Cadastre-se
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
