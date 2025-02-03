'use client'

import React, {useState, useEffect} from 'react'
import Meal from "./components/meal/Meal";
import { v4 } from 'uuid';
import Overall from './components/overall/Overall';
import "./home.css"

export default function Home() {
  const [allMeals, setAllMeals] = useState({ Breakfast: [], Lunch: [], Dinner: [] });
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  
  useEffect(() => {
    if (typeof window !== "undefined") { 
      const savedMeals = JSON.parse(localStorage.getItem("foodLogMeals")) || {};
      setAllMeals(savedMeals[today] || { Breakfast: [], Lunch: [], Dinner: [] });
    }
  }, []);
  
  const updateMeal = (mealType, updatedMeals) => {
    setAllMeals((prev) => {
      const updatedMealsForToday = { ...prev, [mealType]: updatedMeals };
  
      // Update localStorage
      const savedMeals = JSON.parse(localStorage.getItem("foodLogMeals")) || {};
      savedMeals[today] = updatedMealsForToday;
      localStorage.setItem("foodLogMeals", JSON.stringify(savedMeals));
  
      return updatedMealsForToday;
    });
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
