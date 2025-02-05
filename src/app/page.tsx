'use client'

import React, {useState, useEffect} from 'react'
import Meal from "./components/meal/Meal";
import { v4 } from 'uuid';
import Overall from './components/overall/Overall';
import "./home.css"

export default function Home() {
  const [userDetails, setUserDetails] = useState({})
  const [allMeals, setAllMeals] = useState({ Breakfast: [], Lunch: [], Dinner: [] });
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  
  useEffect(() => {
    if (typeof window !== "undefined") { 
      const savedUser = JSON.parse(localStorage.getItem("foodLogUser")) || {
        name: "",
        age: 0,
        sex: "",
        height: { feet: 0, inches: 0, cm: 0 },
        weight: 0,
        lifestyle: "not sure",
        goal: "no goals",
        customCalorie: 0
      }
      setUserDetails(savedUser);

          // Get existing meals or initialize
    const savedMeals = JSON.parse(localStorage.getItem("foodLogMeals")) || {};

    // If today's date doesn't exist, add it
    if (!savedMeals[today]) {
      savedMeals[today] = { Breakfast: [], Lunch: [], Dinner: [] };
      
      // Save the updated meals object back to localStorage
      localStorage.setItem("foodLogMeals", JSON.stringify(savedMeals));
    }

    // Set the meals state
    setAllMeals(savedMeals[today]);
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
      <Overall user={userDetails} data={allMeals}/>
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
