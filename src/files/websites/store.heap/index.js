import React from 'react'
import './css/site.css'
import logo from './images/logo.png'
import trex from './images/trex.png'

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
        Welcome to the Heap store !
        <div className="articles">
          <div className="article">
            <img alt="trex" src={trex}></img>
            <div className="article-content">
              T-Rex
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Store
