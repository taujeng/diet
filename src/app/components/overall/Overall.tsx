'use client'

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import CircleChart from '../circleChart/CircleChart';
import './overall.css';
import HTMLProgressBar from '../progressBar/HTMLProgressBar';

const Overall = ( {user, data} ) => {
  // console.log(JSON.stringify(data))
  
  // const [calorieGoal, setCalorieGoal] = useState(2400);

  // useEffect(() => {
  //   const savedGoal = localStorage.getItem("foodLogUser");
  //   if (savedGoal) {
  //     setCalorieGoal(JSON.parse(savedGoal))
  //   }
  // }, [])
  const calorieGoal = parseInt(user.customCalorie) || 2070;

  const proteinGoal = parseInt(user.customProtein) || 80;

  let calEaten = 0;
  let proteinEaten = 0;
  for (let i = 0, list = Object.keys(data); i < list.length ; i++) {
    data[list[i]].forEach(item => {
      calEaten += Number(item.calories) || 0;
      proteinEaten += Number(item.protein) || 0;
    })
  }

  let calRemaining = calorieGoal - calEaten;
  // let proteinRemaining = proteinGoal - proteinEaten;
  return (
    <div className="overall-container">
      <div className="overall-left">
        {user.newUser ?
          <div className="left-text">
            <b>Note:</b> This daily calorie goal is calculated using the average 30-year-old man with a 
            sedentary lifestyle aiming to losing weight. For a more personalized plan, update your <Link href={"./profile"}>profile.</Link>
          </div>
          :
          <div className="left-text"></div>
        }

      </div>
      <div id="calorie-circle">
        <CircleChart 
          stats={[calEaten, calRemaining]} 
          legend={["Consumed", "Remaining"]}/>
      </div>
      <div className="overall-right">
        <div className="progressBar-container">
          <HTMLProgressBar value={proteinEaten} maxValue={proteinGoal}/>
        </div>
      </div>
    </div>
  )
}

export default Overall