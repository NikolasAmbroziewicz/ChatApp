"use client"
import Link from "next/link";
import { Button, Title, TextInput, PasswordInput } from '@mantine/core';
import { MdAlternateEmail } from "react-icons/md";

import { useSignIn } from "@/features/Accounts/hooks/useSignIn";

const SignInPage = () => {
  const {
    handleSubmit,
    handleFormSubmit,
    errors,
    register,
    loginError
  } = useSignIn()
  
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
        <PasswordInput 
          label="Password"
          placeholder="Password"
          mb={12}
          {...register('password')}
        />
        {errors.password?.message && <p className="text-red-500 text-xs italic mb-[12px]">{errors.password.message}</p>}
        {loginError && <p className="text-red-500 text-xs italic mb-[12px]">{loginError}</p>}
        <Button
          type='submit'
          fullWidth
        >
          Sign In
        </Button>
      </form>
      <Link href="/accounts/signup" className="mt-2 text-slate-600 text-sm">
        Do not you have an account? Sign Up here.
      </Link>
    </div>
  )
}

export default SignInPage