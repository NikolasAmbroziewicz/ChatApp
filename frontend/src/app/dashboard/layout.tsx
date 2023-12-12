'use client'
import { ReactNode } from "react"

import { Grid, Container } from '@mantine/core'
import SideBar from '@/shared/components/sidebar/SideBar'

const ChatLayout = ({ children }: { children: ReactNode }) => {
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
  </div>
  )
}


export default ChatLayout