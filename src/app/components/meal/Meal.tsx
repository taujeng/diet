'use client'

import React from 'react'
import "./meal.css"
import MealRow from './mealRow/MealRow'
import { v4 as uuidv4 } from 'uuid';
import { Plus } from "lucide-react";

const Meal = ( {title, data, updateMeal}) => {


  const totalCalories = data.reduce((acc, currentValue) => {
    const calories = currentValue.calories === "..." ? 0 : parseInt(currentValue.calories);
    return acc += calories;
  }, 0)
  const totalProtein = data.reduce((acc, currentValue) => {
    const protein = currentValue.protein === "..." ? 0 : parseInt(currentValue.protein);
    return acc += protein;
  }, 0)


  const handleNewRow = () => {
    const newDefault = {
      id: uuidv4(),
      name: "",
      quantity: 1,
      size: "Standard",
      calories: "",
      protein: "",
      edit: true
    }
    updateMeal(title, [...data, newDefault])
  }

  const confirmRow = async (id, formData) => {
    let newCalories = formData.formCalories || 0; // Use the provided calories or default to 0
    let newProtein = formData.formProtein || 0;

    // Determine what needs updating
    const fetchCalories = newCalories === 0;
    const fetchProtein = newProtein === 0;

    const newList = data.map((item) => {
      if (item.id === id) {
        const newItem = {...item, 
          name: formData.formName, 
          quantity: formData.formQuantity,
          size: formData.formSize,  
          calories: newCalories > 0 ? newCalories : "...",
          protein: newProtein > 0 ? newProtein : "...",
          edit: false
        }
        return newItem
      }
      return item
    })
    updateMeal(title, newList)

    if (!fetchCalories && !fetchProtein) return;

    try {
      // Only call the API if calories are 0 or not provided
      const response = await fetch("/api/getNutrition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ food: formData.formName, size: formData.formSize }), // Pass the food name from the form
      });

      const res = await response.json();
      const arrayData = JSON.parse(res.user.content);

      if (!response.ok) {
        console.error("API Error:", data.error || "Failed to fetch stats.");
        return;
      }
      if (fetchCalories) {
        newCalories = parseInt(arrayData[0], 10) * formData.formQuantity || 0; // Parse calories as a number or default to 0
      }
      if (fetchProtein) {
        newProtein = parseInt(arrayData[1], 10) * formData.formQuantity || 0; // Parse protein as a number or default to 0
      }
    } catch (error) {
      console.error("Error fetching calorie data:", error);
    }
    const updatedList = newList.map((item) => {
      return item.id === id ? { ...item, calories: newCalories, protein: newProtein } : item
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
      {/* <div className="meal-pic">
        picture here
      </div> */}
      <div className="meal-content">
        <div className="meal-label">
          <div className="label-name">Food/Drink Item</div>
          <div className="label-quantity">Qty</div>
          <div className="label-size">Size</div>
          <div className="label-calories">Calories
            <span className="subtext">(Auto-estimated if left blank)</span>
          </div>
          <div className="label-protein">Protein</div>
          <div className="label-options"></div>
        </div>
        {data && data.map((meal, i) => (
          <MealRow key={meal.id} data={meal} confirmRow={confirmRow} removeRow={removeRow}/>
        ))}
        {data.length > 0 && 
          <div className="sum-container">
            <div className="sum-line"></div>
            <div className="meal-label">
              <div className="label-name"></div>
              <div className="label-quantity"></div>
              <div className="label-size"></div>
              <div className="label-calories" style={{paddingLeft: "5px"}}>{totalCalories || 0}</div>
              <div className="label-protein" style={{paddingLeft: "5px"}}>{totalProtein || 0}</div>
              <div className="label-options"></div>
            </div>
          </div>
        
        }
        <div className="addEntry">
          <Plus className="plus" onClick={()=> handleNewRow()}/>

        </div>
      </div>
    </div>
  )
}

export default Meal