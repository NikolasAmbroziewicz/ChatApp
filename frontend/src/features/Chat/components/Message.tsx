import { USER_NAME, BOT_NAME } from '@/consts'

interface IMessage {
  type: string,
  author: string,
  date: string,
  message: string,
  isAuthor: boolean
}

const Message: React.FC<IMessage> = ({ type, author, date, message, isAuthor }) => {

  return (
    type === BOT_NAME ? (
      <span className='w-[100%] text-center p-2 rounded text-neutral-300'>
        {message}
      </span>
    ) : (
      <div className={`flex flex-col justify-end w-[45%] bg-[#15aabf] ${isAuthor && 'ml-auto mr-2'} p-2 rounded`}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-slate-300 text-xs">{date}</span>
          <span className="text-slate-300">{author}</span>
        </div>
        <span className="text-slate-50">{message}</span>
      </div>
    )
  )
}

export default Message