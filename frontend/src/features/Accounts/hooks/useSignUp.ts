"use Client";
import axios from 'axios'
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signUpSchema, SignUpType } from '@/features/Accounts/validators'

export const useSignUp = () => {
  const router = useRouter()
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema)
  })

  const handleFormSubmit = async (values: SignUpType) => {
    const res = await axios.post(`${String(process.env.NEXT_PUBLIC_BACKEND)}/v1/api/user`, {
      ...values,
    })

    if(res.status === 200) {
      router.push('/accounts/signin')
    }
  }
  
  return {
    handleFormSubmit,
    register,
    errors,
    handleSubmit
  }
}