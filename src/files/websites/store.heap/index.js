import React from 'react'
import './css/site.css'
import logo from './images/logo.png'

function Store() {
  return (
    <div className="body">
      <nav>
        <div className='left-nav'>
          <img src={logo} alt="Heap">
          </img>
        </div>
        <div className='right-nav'>
          <div className='nav-elem'>
            Home
          </div>
        </div>
      </nav>
      <div className='index-content'>
        Bienvenu sur le store de Heap !
      </div>
    </div>
  )
}

export default Store
