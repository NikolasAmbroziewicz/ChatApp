import { Menu } from '@mantine/core';

import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";

import { MessageType } from '../types';

import { BOT_NAME } from '@/consts';
import { useState } from 'react';

interface IMessage {
  element: MessageType
  isAuthor: boolean,
  handleDeleteMessage: (id: string | undefined) => void,
  handleUpdateMessage: () => void
}

const Message: React.FC<IMessage> = ({
  element,
  isAuthor,
  handleDeleteMessage,
  handleUpdateMessage
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)

  const { _id ,message, date, user, type } = element

  return (
    type === BOT_NAME ? (
      <span className='w-[100%] text-center p-2 rounded text-neutral-300'>
        {message}
      </span>
    ) : (
      <div className={`flex flex-col justify-end w-[45%] bg-[#15aabf] ${isAuthor && 'ml-auto mr-2'} mb-2 p-2 rounded`}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-slate-300 text-xs">{date}</span>
          <div className='flex items-center'>
            <span className="text-slate-300">{
              isAuthor 
              ? 'You'
              : user.name
            }</span>
            {
              isAuthor && message && (
                <Menu>
                  <Menu.Target>
                    <button>
                      <BsThreeDotsVertical className="text-slate-50" />
                    </button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item 
                      leftSection={<MdEdit />}
                      onClick={() => handleUpdateMessage()}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item 
                      leftSection={<MdDelete />}
                      onClick={() => handleDeleteMessage(_id)}
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )
            }
          </div>
        </div>
        <span className="text-slate-50">
          {
            message 
              ? message
              : "Message Has Been Deleted"
          }
        </span>
      </div>
    )
  )
}

export default Message