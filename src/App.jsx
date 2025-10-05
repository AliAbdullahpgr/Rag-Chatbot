import React from 'react'
import Sidebar from './components/Sidebar.jsx'
import MainCard from './components/MainCard.jsx'
const App = () => {
  return (
    <div className='font-inter w-full h-screen flex bg-[rgb(25,26,26)]'>
      <Sidebar />
      <MainCard />
    </div>
  )
}

export default App