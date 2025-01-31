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
        protein: 400,
        edit: false,
      },
      {
        id: v4(),
        name: "Mashed Potatoes",
        quantity: 12,
        size: "large",
        calories: 600,
        protein: 200,
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
        protein: 400,
        edit: false,
      },
    ],
    dinner: []
  })

    // Function to update meals from child components
    const updateMeal = (mealType, updatedMeals) => {
      setMeals((prev) => ({
        ...prev,
        [mealType]: updatedMeals
      }));
    };

  return (
    <div className="">
      <Header />
      {Object.entries(meals).map(([key,value]) => {
        return <Meal 
                  key={key}   
                  title={key} 
                  data={value}
                  updateMeal={updateMeal}
                />
      })}
    </div>
  );
}
