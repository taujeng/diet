'use client'

import React from 'react'
import Link from 'next/link'
import "./support.css"

const Support = () => {
  return (
    <div className="support-container">
      <h1>Support & Feedback</h1>
      <p>If you find FoodLogAI useful, consider supporting me with a coffee! ☕</p>
      <Link href="https://buymeacoffee.com/fischer1" className="buyCoffee" target="_blank">☕ Buy me a coffee</Link> 
      <p>
      Have suggestions or feedback? I'd love to hear from you! Email me at FoodLogAI@gmail.com
      </p>

    </div>
  )
}

export default Support