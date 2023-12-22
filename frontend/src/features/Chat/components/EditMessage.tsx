import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';

import { Textarea, Button } from '@mantine/core'
import { IoMdClose, IoMdCheckmark } from "react-icons/io";

import { MessageType } from '../types';
import { MessageSchema, messageSchema } from '../validators';
import { useEffect } from "react";

interface IEditMessage {
  message: MessageType
  handleEditMode: () => void
  handleUpdateMessage: (content: string, messageId: string) => void
}

const EditMessage: React.FC<IEditMessage> = ({
  message,
  handleEditMode,
  handleUpdateMessage
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema)
  })

  useEffect(() => {
    setValue('content', message.message, { shouldValidate: true })
  }, [])

  const handleSubitMessage = (val: MessageSchema) => {
    if (message._id === undefined) return 

    handleEditMode()
    handleUpdateMessage(val.content, message._id)
  }

  console.log(errors.content?.message)

  return (
    <form onSubmit={handleSubmit(handleSubitMessage)}>
        <Textarea
          className='pb-2'
          placeholder='Message'
          error={errors.content?.message !== undefined}
          {...register('content')}
        />
        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="filled" 
            color="red"   
            onClick={handleEditMode}
            style={{ padding: '4px 8px' }}
          >
            <IoMdClose />
          </Button>
          <Button 
            type="submit"
            variant="filled"
            color="rgba(255, 255, 255, 1)"
            style={{ color: "#15aabf", padding: '4px 8px'}}
          >
            <IoMdCheckmark />
          </Button>
        </div>
    </form>
  )
}

export default EditMessage