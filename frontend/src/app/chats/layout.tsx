'use client'
import { ReactNode } from "react"

import { Grid, Modal } from '@mantine/core'
import SideBar from '@/shared/components/sidebar/SideBar'
import ManageChatForm from "@/features/Chat/components/ManageChatForm"

import { useChatContext } from "@/context/ChatContext"

const ChatLayout = ({ children }: { children: ReactNode }) => {

const { modalVisibility, toggleModalVisibility, editedChatValue } = useChatContext()

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
      <Modal opened={modalVisibility} onClose={toggleModalVisibility} title={editedChatValue === null ? "Create New Chat" : "Update Chat"}>
        <ManageChatForm />
      </Modal>
    </div>
  )
}


export default ChatLayout