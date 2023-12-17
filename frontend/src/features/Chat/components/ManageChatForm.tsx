'use client'

import { useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Input } from '@mantine/core'

import { useChatContext } from "@/context/ChatContext";

import { manageChatSchema, ManageChatSchema } from "../validators";

const ManageChatForm = () => {
  const {
    register, 
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<ManageChatSchema>({
    resolver: zodResolver(manageChatSchema)
  })

  const { 
    createChat, 
    editedChatValue,
    toggleModalVisibility,
    updateChat
  } = useChatContext()

  const handleAddChat = (val: ManageChatSchema) => {
    createChat(val.title)
    toggleModalVisibility()
  }

  const handleEditChat = (val: ManageChatSchema) => {
    if (editedChatValue?._id === undefined) return

    updateChat( editedChatValue?._id ,val.title)
    toggleModalVisibility()
  }
 
  useEffect(() => {
    console.log('edited', editedChatValue)

    if (editedChatValue !== null) {
      setValue('title', editedChatValue.title)
    }

  }, [editedChatValue])

  return (
    <form 
      className="flex flex-col"
      onSubmit={handleSubmit(
        editedChatValue !== null 
        ? (data) => handleEditChat(data)
        : (data) => handleAddChat(data)
      )}
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
        Submit
      </Button>
    </form>
  )
}

export default ManageChatForm;