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

  const { createChat, toggleModalVisibility } = useChatContext()

  const handleFormSubmit = (val: ManageChatSchema) => {
    createChat(val.title)
    toggleModalVisibility()
  }

  return (
    <form 
      className="flex flex-col"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Input 
        {...register('title')}
        mb={8}
      />
      {errors.title?.message && <p className="text-red-500 text-xs italic mb-[12px]">{errors.title?.message}</p>}
      <Button 
        type="submit"
        color='#bfdbfe' 
        w={"60%"}
        m={"auto"}
        mt={8}
      >
        Create New Chat
      </Button>
    </form>
  )
}

export default CreateChatForm;