"use client";
import { useState } from 'react'
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signUpSchema, SignUpType } from '@/features/Accounts/validators'
import { useAccountApi } from "@/features/Accounts/hooks/useAccountApi";

export const useSignUp = () => {
  const [registerError, setRegisterError] = useState('')
  const router = useRouter()
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema)
  })

  const handleFormSubmit = async (values: SignUpType) => {
    const { signUpUser } = useAccountApi()
    const res = await signUpUser(values)

    if(Boolean(res)) {
      router.push('/accounts/signin')
    } else {
      setRegisterError('Ups Sth went Wrong! Try again later!')
    }
  }
  
  return {
    handleFormSubmit,
    register,
    errors,
    registerError,
    handleSubmit
  }
}