// eslint-disable-next-line no-unused-vars
import React from 'react'
import NoChatSelected from '@/components/common/Messages/NoChatSelected'
import MessageList from '@/components/common/Messages/MessageList'
import { useSelector } from 'react-redux'
import ChatContainer from '@/components/common/Messages/ChatContainer'
import NavBar from '@/components/admin/NavBar'
import Nav from '@/components/user/Nav'


function Message() {

 const { selectedUser } = useSelector(
    (state) => state.message
  )

  const { user } = useSelector((state) => state.auth); 


  return (
    <div className="h-screen w-screen  ">
      {user?.role === 'admin' ? <NavBar /> : <Nav />}
    <div className="flex items-center border-b-2 border-b-green-950  justify-center pt-20 px-4">

    <div className="flex h-[80vh] w-full lg:pt-20 px-8 rounded-lg overflow-hidden">
          <MessageList />

          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
    </div>
    <footer className='mt-4'>
    <div className="text-center text-sm text-green-950">
          © 2025 ProHire Inc.
        </div>
    </footer>
  </div>
  )
}

export default Message
