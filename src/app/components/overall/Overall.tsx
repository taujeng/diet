import React from 'react'
import CircleChart from '../circleChart/CircleChart'

const Overall = ( {data} ) => {
  const avgCalorie = 10000
  const avgProtein = 200

  let calEaten = 0;
  let proteinEaten = 0;
  for (let i = 0, list = Object.keys(data); i < list.length ; i++) {
    data[list[i]].forEach(item => {
      calEaten += item.calories;
      proteinEaten += item.protein;
    })
  }

  let calRemaining = avgCalorie - calEaten;
  let proteinRemaining = avgProtein - proteinEaten;
  return (
    <div>
      <CircleChart stats={[calEaten, calRemaining]} legend={["Calories Consumed", "Calories Remaining"]}/>
    </div>
  )
}

export default Overall