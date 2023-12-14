'use client'
import { useState } from 'react'
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signInSchema, SignInType } from '@/features/Accounts/validators'

export const useSignIn = () => {
  const router = useRouter()
  const [loginError, setLoginError] = useState<string>("");

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema)
  })

  const handleFormSubmit = async (values: SignInType) => {
    const res = await signIn('credentials', {
      ...values,
      redirect: false
    })

    if (!res?.error) {
      router.push('/chats')
    } else {
      setLoginError(res.error)
    }
  }
  
  return {
    loginError,
    handleFormSubmit,
    register,
    errors,
    handleSubmit
  }
}