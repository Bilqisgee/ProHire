// eslint-disable-next-line no-unused-vars
import React from 'react'
import { X } from 'lucide-react';
import { useSelector,  useDispatch } from 'react-redux';
import { clearSelectedUser } from '@/store/common/messageSlice';

function ChatHeader() {

const { selectedUser,  onlineUsers } = useSelector((state) => state.message)

const dispatch = useDispatch();

  return (
    <div className="p-2.5 border-b border-base-300 -mt-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.image || "/profile-icon.jpg"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.userName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => dispatch(clearSelectedUser(null))}>
          <X />
        </button>
      </div>
    </div>
  )
}

export default ChatHeader