// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './Skeleton/MessageSkeleton';
import { useSelector, useDispatch } from 'react-redux';
import { formatMessageTime } from '@/lib/utils';
import { getMessage } from '@/store/common/messageSlice';

function ChatContainer() {
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  )
  const { messages, selectedUser , isMessageLoading } = useSelector(
    (state) => state.message
  )

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      dispatch(getMessage(selectedUser ._id)); // Fixed dispatch syntax
    }
  }, [dispatch, selectedUser ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto ">
  <ChatHeader />
  <div className='flex-1 overflow-y-auto p-4 space-y-4'>
    {messages.map((message) => (
      <div 
        key={message._id}
        className={`flex items-start gap-2 ${message.senderId === user._id ? "justify-end" : "justify-start"}`}
      >
        {/* Avatar - Only show for receiver (left side) */}
        {message.senderId !== user._id && (
          <div className="flex-shrink-0 size-8 rounded-full border">
            <img
              src={selectedUser.image || "/profile-icon.jpg"}
              alt="Receiver"
              className="w-full h-full rounded-full"
            />
          </div>
        )}

        {/* Message Bubble */}
        <div className={`flex flex-col ${message.senderId === user._id ? "items-end" : "items-start"}`}>
          <div className="text-xs opacity-50 mb-1">
            {formatMessageTime(message.createdAt)}
          </div>
          <div 
            className={`flex gap-2 ${message.senderId === user._id ? "flex-row-reverse" : ""}`}
          >
            {/* Avatar - Only show for sender (right side) */}
            {message.senderId === user._id && (
              <div className="flex-shrink-0 size-8 rounded-full border">
                <img
                  src={user.image || "/profile-icon.jpg"}
                  alt="Sender"
                  className="w-full h-full rounded-full"
                />
              </div>
            )}

            {/* Message Content */}
            <div 
              className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                message.senderId === user._id 
                  ? "bg-gray-200 text-primary-content" 
                  : "bg-gray-200 text-green-950"
              }`}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="rounded-md mb-2 max-w-full h-auto"
                />
              )}
              {message.text && <p className="break-words">{message.text}</p>}
            </div>
          </div>
        </div>
      </div>
    ))}
    <div ref={messageEndRef} />
  </div>
  <MessageInput />
</div>
  );
};

export default ChatContainer;