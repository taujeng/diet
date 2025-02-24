'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import "./header.css"

const Header = () => {
  const pathname = usePathname();

  return (
    <div className="header-container">
      <div className="header-left">
        <h1><Link href={"/"}>FoodLogAI</Link></h1>
      </div>
      <div className="header-right">
        <ul>
          <li className={pathname === "/profile" ? "active" : ""}><Link href={"/profile"} 
            >Profile</Link></li>
          {/* <li>About</li> */}
          <li className={pathname === "/support" ? "active" : ""}><Link href={"/support"}
            >Support</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Header