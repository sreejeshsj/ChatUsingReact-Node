import React from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat'

function Home() {
  return (
    <div className='home-container'>
        <div className='sidebar'> <Sidebar /></div>
        <div className='chat'><Chat /></div>
      
    </div>
  )
}

export default Home
