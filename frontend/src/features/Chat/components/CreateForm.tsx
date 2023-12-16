'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Input } from '@mantine/core'

import { useChatContext } from "@/context/ChatContext";

import { manageChatSchema, ManageChatSchema } from "../validators";

const CreateChatForm = () => {

  const {
    register, 
    formState: { errors },
    handleSubmit
  } = useForm<ManageChatSchema>({
    resolver: zodResolver(manageChatSchema)
  })

  const { createChat } = useChatContext()

  const handleFormSubmit = (val: ManageChatSchema) => {
    createChat(val.title)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Input 
        {...register('title')}
      />
      <Button 
        type="submit"
        color='#bfdbfe' 
        w={"60%"}
      >
        Create New Chat
      </Button>
    </form>
  )
}

export default CreateChatForm;