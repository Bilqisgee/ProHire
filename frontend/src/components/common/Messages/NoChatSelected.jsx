// eslint-disable-next-line no-unused-vars
import React from 'react'

import { MessageSquare } from 'react-feather'

function NoChatSelected() {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50  -mt-20">
    <div className="max-w-md text-center space-y-6">
      {/* Icon Display */}
      <div className="flex justify-center gap-4 mb-4">
        <div className="relative">
          <div
            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
           justify-center animate-bounce"
          >
            <MessageSquare className="w-8 h-8 text-primary " />
          </div>
        </div>
      </div>

      {/* Welcome Text */}
      <h2 className="text-2xl font-bold">Welcome to Prohire!</h2>
      <p className="text-base-content/60">
        Select a user  to Hire...
      </p>
    </div>
  </div>
  )
}

export default NoChatSelected
