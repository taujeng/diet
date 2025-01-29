'use client'

import React from 'react'
import "./meal.css"
import MealRow from './mealRow/MealRow'
import { v4 as uuidv4 } from 'uuid';

const Meal = ( {title, data, updateMeal}) => {

  const handleNewRow = () => {
    const newDefault = {
      id: uuidv4(),
      name: "",
      quantity: 1,
      size: "normal",
      calories: null,
      edit: true
    }
    updateMeal(title, [...data, newDefault])
  }

  const confirmRow = async (id, formData) => {
    let newCalories = formData.formCalories || 0; // Use the provided calories or default to 0

    const newList = data.map((item) => {
      if (item.id === id) {
        const newItem = {...item, 
          name: formData.formName, 
          quantity: formData.formQuantity,
          size: formData.formSize,  
          calories: newCalories > 0 ? formData.calories : "...",
          edit: false
        }
        return newItem
      }
      return item
    })
    updateMeal(title, newList)


    try {
      // Only call the API if calories are 0 or not provided
      if (newCalories === 0) {
        const response = await fetch("/api/getCalories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ food: formData.formName }), // Pass the food name from the form
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          console.error("API Error:", data.error || "Failed to fetch calories.");
          return;
        }
        console.log(data)
        newCalories = parseInt(data.user.content, 10) || 0; // Parse calories as a number or default to 0
      }
    } catch (error) {
      console.error("Error fetching calorie data:", error);
    }
    const updatedList = newList.map((item) => {
      if (item.id === id) {
        return { ...item, calories: newCalories };
      }
      return item;
    });
  
    updateMeal(title, updatedList);
  }

  const removeRow = (id) => {
    const newList = data.filter((item) => {
      return item.id !== id
    })
    updateMeal(title, newList)
  }

  return (
    <div className="meal-container">
      <div className="meal-title">
        <h1>{title}</h1>
      </div>
      <div className="meal-pic">
        picture here
      </div>
      <div className="meal-content">
        <div className="meal-label">
          <div className="label-name"></div>
          <div className="label-quantity">qty</div>
          <div className="label-size">size</div>
          <div className="label-stats">stats</div>
          <div className="label-delete"></div>
        </div>
        <button onClick={()=> handleNewRow()}>ADD ROW</button>
        {data && data.map((meal, i) => (
          <MealRow key={meal.id} data={meal} confirmRow={confirmRow} removeRow={removeRow}/>
        ))}
      </div>
    </div>
  )
}

export default Meal