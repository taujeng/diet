import React from 'react'
import Link from 'next/link'
import CircleChart from '../circleChart/CircleChart'
import './overall.css'

const Overall = ( {data} ) => {
  const avgCalorie = 2400
  const avgProtein = 70

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
      <div className="overall-left">
        <div className="left-text">
          <b>Note:</b> This daily calorie goal is calculated using the average 30-year-old man with a 
          sedentary lifestyle aiming to losing weight. For a more personalized plan, go to the <Link href={"./profile"}>Profile page.</Link>
        </div>
      </div>
      <div id="calorie-circle">
        <CircleChart 
          stats={[calEaten, calRemaining]} 
          legend={["Consumed", "Remaining"]}/>
      </div>
      <div className="overall-right"></div>
    </div>
  )
}

export default Overall