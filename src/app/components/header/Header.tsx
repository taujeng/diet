import React from 'react'
import Link from 'next/link'
import "./header.css"

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-left">
        <h1><Link href={"/"}>FoodLogAI</Link></h1>
      </div>
      <div className="header-right">
        <ul>
          <li>About</li>
          <li>Stats</li>
          <li>Support</li>
        </ul>
      </div>
    </div>
  )
}

export default Header