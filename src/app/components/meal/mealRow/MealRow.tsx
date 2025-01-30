'use client'

import React, {useState} from 'react'
import "./mealRow.css"

const MealRow = ( {data, confirmRow, removeRow} ) => {
  const {id, name, quantity, size, calories, protein, edit} = data
  const [formData, setFormData] = useState({
    formName: name, formQuantity: quantity, formSize: size, formCalories: calories, formProtein: protein
  })

  if (edit) {
    return (
      <div className="mealRow-container">
        <input  className="meal-name" 
          defaultValue={name}
          onChange={(e) => setFormData({...formData, formName:e.target.value})}
          autoFocus
        />
        <input className="meal-quantity formQty" 
          defaultValue={quantity}
          type="number"
          min="1"
          onChange={(e) => setFormData({...formData, formQuantity: e.target.value})}
        />
        <select className="meal-size"
          value={formData.formSize}
          onChange={(e) => setFormData({...formData, formSize: e.target.value})}
        >
          <option value="small">Small</option>
          <option value="normal">Normal</option>
          <option value="large">Large</option>
        </select>
        <input 
          defaultValue={calories}
          className="formStats"
          type="number"
          onChange={(e)=> setFormData({...formData, formCalories: e.target.value})}
        />
        <input 
          defaultValue={protein}
          className="formStats"
          type="number"
          onChange={(e)=> setFormData({...formData, formProtein: e.target.value})}
        />
        <div className="meal-options">
          <div className="meal-submit"
            onClick={()=> confirmRow(id, formData)}
          >Y</div>
          <button onClick={()=> removeRow(id)}>X</button>
        </div>
      </div>
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
        <div className="meal-submit noShow">Y</div>
        <button onClick={()=> removeRow(id)}>X</button>
      </div>
    </div>
  )
}

export default MealRow