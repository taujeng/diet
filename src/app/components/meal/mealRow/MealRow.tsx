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
          max="99"
          step="1"
          onChange={(e) => {
            const value = parseInt(e.target.value, 10)
            setFormData({...formData, formQuantity: value > 0 ? value : 1})}}
        />
        <select className="meal-size"
          aria-label="portion size"
          value={formData.formSize}
          onChange={(e) => {
            console.log(e.target.value)
            setFormData({...formData, formSize: e.target.value})}}
        >
          <option value="Small">Small</option>
          <option value="Standard">Standard</option>
          <option value="Large">Large</option>
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
            <Check  className="submit-btn" style={{color: formData.formName === "" ? "grey" : "#7ed957", cursor: formData.formName === "" ? "" : "pointer" } }/>
          </button>
          <X className="remove-btn" onClick={()=> removeRow(id)} aria-label="remove entry"/>
        </div>
      </form>
    )
  }



  return (
    <div className="mealRow-container">
      <div className="meal-name">{name}</div>
      <div className="meal-quantity" style={{paddingRight: "15px"}}>{quantity}</div>
      <div className="meal-size" style={{paddingLeft: "5px"}}>{size}</div>
      <div className="meal-calories" style={{paddingLeft: "5px"}}>{calories}</div>
      <div className="meal-protein" style={{paddingLeft: "5px"}}>{protein}</div>
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