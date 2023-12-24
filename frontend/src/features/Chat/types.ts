export type MessageType = {
  _id?: string,
  type: string,
  user: {
    _id: string,
    name: string
  },
  date: string,
  message: string,
}

export type JoinRoomType = {
  room: string,
  user: string
}

export type UserTyping = {
  _id: string,
  name: string
}