"use client"
import Link from "next/link";
import { Button, Title, TextInput, PasswordInput } from '@mantine/core';
import { MdAlternateEmail } from "react-icons/md";

import { useSignUp } from "@/features/Accounts/hooks/useSignUp";

const SignUpPage = () => {
  const {
    handleSubmit,
    handleFormSubmit,
    register
  } = useSignUp()
  return (
    <div className='flex flex-col w-full h-screen justify-center items-center'>
      <form 
        onSubmit={handleSubmit(handleFormSubmit)}
        className='min-w-[320px]'
      >
        <Title align="center" size="h1" mb={12}>Sign In</Title>
        <TextInput
          label="Email"
          placeholder="Email"
          mb={12}
          leftSection={<MdAlternateEmail size={16} />}
          {...register('email')}
        />
        <TextInput
          label="Name"
          placeholder="name"
          mb={12}
          {...register('name')}
        />
        <PasswordInput 
          label="Password"
          placeholder="Password"
          mb={12}
          {...register('password')}
        />
        <PasswordInput 
          label="Password"
          placeholder="Password"
          mb={12}
          {...register('passwordConfirmation')}
        />
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