'use client'

import React, {useState} from 'react'
import "./meal.css"
import MealRow from './mealRow/MealRow'
import { v4 as uuidv4 } from 'uuid';

const Meal = ( {title, data}) => {
  const [mealData, setMealData] = useState(data);


  const handleNewRow = () => {
    const newDefault = {
      id: uuidv4(),
      name: "",
      quantity: 1,
      size: "normal",
      calories: null,
      edit: true
    }
    setMealData([...mealData, newDefault])
  }

  const confirmRow = (id, formData) => {
    const newList = mealData.map((item) => {
      if (item.id === id) {
        const newItem = {...item, 
          name: formData.formName, 
          quantity: formData.formQuantity,
          size: formData.formSize,  
          edit: false
        }
        return newItem
      }
      return item
    })
    setMealData(newList)
  }

  const removeRow = (id) => {
    const newList = mealData.filter((item) => {
      return item.id !== id
    })
    setMealData(newList)
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
        {mealData && mealData.map((meal, i) => (
          <MealRow key={meal.id} data={meal} confirmRow={confirmRow} removeRow={removeRow}/>
        ))}
      </div>
    </div>
  )
}

export default Meal