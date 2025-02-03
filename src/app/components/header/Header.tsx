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
          <li><Link href={"/profile"}>Profile</Link></li>
          <li>About</li>
          <li>Support</li>
        </ul>
      </div>
    </div>
  )
}

export default Header