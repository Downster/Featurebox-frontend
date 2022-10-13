import Head from 'next/head'
import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { tokenFetch } from "@/utils/tokenFetch";
import { setCookie } from 'cookies-next'

const schema = yup.object({
  first_name: yup.string()
    .required()
    .min(3, "First name must be a minimum of 3 characters")
    .max(20, "First name can be at most 20 characters"),
  last_name: yup.string()
    .required()
    .min(3, "Last name must be at least 3 characters")
    .max(400, "Last name must be less than 400 characters"),
  email: yup.string()
    .required()
    .email("Must be a valid email"),
  password: yup.string()
    .required()
    .min(8, "Password must be 8 characters minimum")
})

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {

    const res = await tokenFetch('/api/users', {
      method: "POST",
      body: JSON.stringify({
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        password: data.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    )
    const token = await res.json()
    if ("Authorization" in token) {
      setCookie("Authorization", token.Authorization)
      //todo redirect to protected area
    } else {
      //errors
    }

  }
  return (
    <>
      <Head>
        <title>Sign Up - TaxPal</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Get started for free
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Already registered?{' '}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign in
              </Link>{' '}
              to your account.
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="First name"
            id="first_name"
            register={register}
            name="first_name"
            type="text"
            autoComplete="given-name"
            required
          />
          <p>{errors.first_name?.message}</p>
          <TextField
            label="Last name"
            id="last_name"
            register={register}
            name="last_name"
            type="text"
            autoComplete="family-name"
            required
          />
          <p>{errors.last_name?.message}</p>
          <TextField
            className="col-span-full"
            label="Email address"
            id="email"
            register={register}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <p>{errors.email?.message}</p>
          <TextField
            className="col-span-full"
            label="Password"
            id="password"
            register={register}
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
          <p>{errors.password?.message}</p>
          <div className="col-span-full">
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Sign up <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  )
}
