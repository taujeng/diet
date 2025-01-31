'use client'

import React, {useState} from 'react'
import { X, Check } from 'lucide-react';
import "./mealRow.css"

const MealRow = ( {data, confirmRow, removeRow} ) => {
  const {id, name, quantity, size, calories, protein, edit} = data
  const [formData, setFormData] = useState({
    formName: name, formQuantity: quantity, formSize: size, formCalories: calories, formProtein: protein
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    confirmRow(id, formData)
  }
  

  if (edit) {
    return (
      <form onSubmit={(e) => handleSubmit(e)} className="mealRow-container">
        <input  className="meal-name" 
          aria-label="food item"
          value={formData.formName}
          onChange={(e) => setFormData({...formData, formName:e.target.value})}
          autoFocus
          required
        />
        <input className="meal-quantity formQty" 
          aria-label="quantity"
          value={formData.formQuantity}
          type="number"
          min="1"
          step="1"
          onChange={(e) => {
            const value = parseInt(e.target.value, 10)
            setFormData({...formData, formQuantity: value > 0 ? value : 1})}}
        />
        <select className="meal-size"
          aria-label="portion size"
          value={formData.formSize}
          onChange={(e) => 
            setFormData({...formData, formSize: e.target.value})}
        >
          <option value="small">Small</option>
          <option value="normal">Normal</option>
          <option value="large">Large</option>
        </select>
        <input 
          aria-label="# of calories"
          value={formData.formCalories}
          className="formStats"
          type="number"
          onChange={(e)=> setFormData({...formData, formCalories: e.target.value})}
        />
        <input
          aria-label="# of protein" 
          value={formData.formProtein}
          className="formStats"
          type="number"
          onChange={(e)=> setFormData({...formData, formProtein: e.target.value})}
        />
        <div className="meal-options">
          <button type="submit" disabled={formData.formName === ""} aria-label="confirm entry">
            <Check  className="submit-btn" style={{color: formData.formName === "" ? "grey" : "green"}}/>
          </button>
          <X className="remove-btn" onClick={()=> removeRow(id)} aria-label="remove entry"/>
        </div>
      </form>
    )
  }



  return (
    <div className="mealRow-container">
      <div className="meal-name">{name}</div>
      <div className="meal-quantity">{quantity}</div>
      <div className="meal-size">{size}</div>
      <div className="meal-calories">{calories}</div>
      <div className="meal-protein">{protein}</div>
      <div className="meal-options">
        <button type="submit">
            <Check  className="submit-btn noShow"/>
        </button>
        <X className="remove-btn" onClick={()=> removeRow(id)}/>

      </div>
    </div>
  )
}

export default MealRow