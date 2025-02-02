import React from 'react'
import CircleChart from '../circleChart/CircleChart'
import './overall.css'

const Overall = ( {data} ) => {
  const avgCalorie = 10000
  const avgProtein = 200

  let calEaten = 0;
  let proteinEaten = 0;
  for (let i = 0, list = Object.keys(data); i < list.length ; i++) {
    data[list[i]].forEach(item => {
      calEaten += Number(item.calories) || 0;
      proteinEaten += Number(item.protein) || 0;
    })
  }

  let calRemaining = avgCalorie - calEaten;
  let proteinRemaining = avgProtein - proteinEaten;
  return (
    <div className="overall-container">
      <div id="calorie-circle">
        <CircleChart 
          stats={[calEaten, calRemaining]} 
          legend={["Consumed", "Remaining"]}/>

      </div>
    </div>
  )
}

export default Overall