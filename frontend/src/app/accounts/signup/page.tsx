"use client"
import Link from "next/link";
import { Button, Title, TextInput, PasswordInput } from '@mantine/core';
import { MdAlternateEmail } from "react-icons/md";

import { useSignUp } from "@/features/Accounts/hooks/useSignUp";

const SignUpPage = () => {
  const {
    handleSubmit,
    handleFormSubmit,
    register,
    registerError,
    errors
  } = useSignUp()

  return (
    <div className='flex flex-col w-full h-screen justify-center items-center'>
      <form 
        onSubmit={handleSubmit(handleFormSubmit)}
        className='min-w-[320px]'
      >
        <Title className="text-center" size="h1" mb={12}>Sign In</Title>
        <TextInput
          label="Email"
          placeholder="Email"
          mb={12}
          leftSection={<MdAlternateEmail size={16} />}
          {...register('email')}
        />
        {errors.email?.message && <p className="text-red-500 text-xs italic mb-[12px]">{errors.email.message}</p>}
        <TextInput
          label="Name"
          placeholder="name"
          mb={12}
          {...register('name')}
        />
        {errors.name?.message && <p className="text-red-500 text-xs italic mb-[12px]">{errors.name?.message}</p>}
        <PasswordInput 
          label="Password"
          placeholder="Password"
          mb={12}
          {...register('password')}
        />
        {errors.password?.message && <p className="text-red-500 text-xs italic mb-[12px]">{errors.password?.message}</p>}
        <PasswordInput 
          label="Password"
          placeholder="Password"
          mb={12}
          {...register('passwordConfirmation')}
        />
        {errors.passwordConfirmation?.message && <p className="text-red-500 text-xs italic mb-[12px]">{errors.passwordConfirmation?.message}</p>}
        {registerError && <p className="text-red-500 text-xs italic mb-[12px]">{registerError}</p>}
        <Button
          type='submit'
          fullWidth
        >
          Sign Up
        </Button>
      </form>
      <Link href="/accounts/signin" className="mt-2 text-slate-600 text-sm">
          Do you have account? Sign In here.
      </Link>
    </div>
  )
}

export default SignUpPage