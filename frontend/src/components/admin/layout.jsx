// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

function  AdminLayout() {
  return (
    <div className='min-h-screen flex flex-col'>
      <NavBar />



<Outlet />

    </div>
  )
}

export default  AdminLayout
