'use client'

import React, {useState} from 'react'
import Header from "./components/header/Header";
import Meal from "./components/meal/Meal";
import { v4 } from 'uuid';

export default function Home() {
  const [message, setMessage] = useState('')
  const [meals, setMeals] = useState({
    breakfast: [
      {
        id: v4(),
        name: "Steak",
        quantity: 1,
        size: "normal",
        calories: 1200,
        edit: false,
      },
      {
        id: v4(),
        name: "Mashed Potatoes",
        quantity: 12,
        size: "large",
        calories: 600,
        edit: false,
      },
    ],
    lunch: [
      { 
        id: v4(),
        name: "Chicken Sandwich",
        quantity: 1,
        size: "large",
        calories: 700,
        edit: false,
      },
    ],
    dinner: []
  })

  const fetchData = async (slug) => {
    // e.preventDefault()
    
    try {
      const response = await fetch('/api/getCalories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          food: slug,
        })
      })
      
      const data = await response.json()
      setMessage(data.success ? 'User created!' : 'Failed to create user')
      console.log( data)
      console.log(data.success ? data.user : 'Failed to create user')
    } catch (error) {
      setMessage('Error creating user')
    }
  }

  return (
    <div className="">
      <Header />
      <button onClick={() => fetchData("blueberry muffin")}>Test Me</button>
      {Object.entries(meals).map(([key,value], index) => {
        return <Meal key={index} title={key} data={value}/>
      })}
    </div>
  );
}
