interface IMessage {
  author: string,
  date: string,
  description: string,
  isAuthor: boolean
}

const Message: React.FC<IMessage> = ({ author, date, description, isAuthor }) => {
  return (
    <div className={`flex flex-col justify-end w-[45%] bg-blue-200 ${isAuthor && 'ml-auto'} p-2 rounded`}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-slate-700 text-xs">{date}</span>
        <span className="text-slate-600">{author}</span>
      </div>
      <span className="text-slate-950">{description}</span>
    </div>
  )
}

export default Message