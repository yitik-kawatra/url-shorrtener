import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header'
const AppLayout = () => {
  return (
    <div>
        <main className='min-h-screen container px-16'>
            <Header/>
            <Outlet />
        </main>

        <div className='p-10 text-center bg-gray-800 mt-10'>
            Made with 💖 by Yitik Kawatra
        </div>
    </div>
  )
}

export default AppLayout