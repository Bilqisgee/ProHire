// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'

function UserLayout() {
  return (
    <div  className='min-h-screen flex flex-col'>
  <Nav />


      <Outlet />
    </div>
  )
}

export default UserLayout
