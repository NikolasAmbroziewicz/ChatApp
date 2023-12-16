'use client'
import { ReactNode } from "react"

import { Grid, Modal } from '@mantine/core'
import SideBar from '@/shared/components/sidebar/SideBar'
import CreateChatForm from "@/features/Chat/components/CreateForm"

import { useChatContext } from "@/context/ChatContext"

const ChatLayout = ({ children }: { children: ReactNode }) => {
const { modalVisibility, toggleModalVisibility } = useChatContext()
  return (
    <div className='h-[100vh]'>
      <Grid justify="flex-start" align="stretch">
        <Grid.Col span={3}>
          <SideBar />
        </Grid.Col>
        <Grid.Col span="auto">
          {children}
        </Grid.Col>
      </Grid>
      <Modal opened={modalVisibility} onClose={toggleModalVisibility}>
        <CreateChatForm />
      </Modal>
    </div>
  )
}


export default ChatLayout