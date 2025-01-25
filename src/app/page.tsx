'use client'

import React, {useState} from 'react'
import Header from "./components/header/Header";
import Meal from "./components/meal/Meal";
import { v4 } from 'uuid';

export default function Home() {
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
  return (
    <div className="">
      <Header />
      {Object.entries(meals).map(([key,value], index) => {
        return <Meal key={index} title={key} data={value}/>
      })}
    </div>
  );
}
