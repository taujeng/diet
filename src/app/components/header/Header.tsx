import React from 'react'
import "./header.css"

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-left">
        <h1>Diet</h1>
      </div>
      <div className="header-right">
        <ul>
          <li>About</li>
          <li>Stats</li>
          <li>Options</li>
        </ul>
      </div>
    </div>
  )
}

export default Header