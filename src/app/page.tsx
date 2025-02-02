'use client'

import React, {useState} from 'react'
import Meal from "./components/meal/Meal";
import { v4 } from 'uuid';
import Overall from './components/overall/Overall';
import "./home.css"

export default function Home() {
  const [message, setMessage] = useState('')
  const [allMeals, setAllMeals] = useState({
    Breakfast: [
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
    Lunch: [
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
    Dinner: []
  })

    // Function to update meals from child components
    const updateMeal = (mealType, updatedMeals) => {
      setAllMeals((prev) => ({
        ...prev,
        [mealType]: updatedMeals
      }));
    };

  return (
    <div className="home-container">
      <Overall data={allMeals}/>
      {Object.entries(allMeals).map(([key,value]) => {
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
