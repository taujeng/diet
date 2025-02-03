'use client'

import React, {useState, useEffect} from 'react';
import './profile.css'

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    age: 0,
    sex: "",
    height: { feet: 0, inches: 0, cm: 0 },
    weight: 0,
    lifestyle: "not sure",
    goal: "no goals"
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("appLogUser");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  // allows for auto updates
  // useEffect(() => {
  //   localStorage.setItem("appLogUser", JSON.stringify(profile));
  // }, [profile]);

  const handleChange = (e) => {
    setProfile({...profile, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("appLogUser", JSON.stringify(profile));
  };

  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit}>
        <div className="profile-name profile-card">
          <div className="profile-question">
            What's your first name?
          </div>
          <div className="name-answer">
            <input name="name" value={profile.name} onChange={(e)=> handleChange(e)} type="text" required/>
          </div>
        </div>
        <div className="profile-age profile-card">
          <div className="profile-question">
            How old are you?
          </div>
          <div className="age-answer">
            <input value={profile.age}
                onChange={(e) => handleChange(e)}
                name="age" type="number" step="1" min="1" max="120"/>
          </div>
        </div>
        <div className="profile-sex profile-card">
          <div className="profile-question">
            What is your sex?
          </div>
          <div className="sex-answer">
            <button onClick={(e)=> {
              e.preventDefault();
              setProfile({...profile, sex: "female"})
            }} className={`profile-btn ${profile.sex === "female" && "selected"}`}>Female</button>
            <button onClick={(e) => {
              e.preventDefault();
              setProfile({...profile, sex: "male"})
            }} className={`profile-btn ${profile.sex === "male" && "selected"}`}>Male</button>
          </div>
        </div>
        <div className="profile-height profile-card">
          <div className="profile-question">
            What is your height?
          </div>
          <div className="height-answer">
            <input name="feet" value={profile.height.feet}
              onChange={e => {
                setProfile({...profile, height: {...profile.height, [e.target.name]: e.target.value}})
              }}
              type="number" step="1" min="1" max="8" required/> ft 
            <input name="inches" value={profile.height.inches} 
              onChange={e => {
                setProfile({...profile, height: {...profile.height, [e.target.name]: e.target.value}})
              }}
              type="number" step="1" min="0" max="11.5"/> in
          </div>
        </div>
        <div className="profile-weight profile-card">
          <div className="profile-question">
            How much do you weight?
          </div>
          <div className="weight-answer">
            <input name="weight" value={profile.weight} onChange={(e) => handleChange(e)} type="number" step="1" min="1" max="500" required/> lbs
          </div>
        </div>
        <div className="profile-lifestyle profile-card">
          <div className="profile-question">
            How active are you?
          </div>
          <div className="lifestyle-answer">
            <button 
              onClick={(e)=> {
                e.preventDefault();
                setProfile({...profile, lifestyle: "inactive"})}}
              className={`profile-btn ${profile.lifestyle === "inactive" && "selected"}`}>Inactive</button>
            <button 
              onClick={(e)=> {
                e.preventDefault();
                setProfile({...profile, lifestyle: "moderately active"})}}
              className={`profile-btn ${profile.lifestyle === "moderately active" && "selected"}`}>Moderately Active</button>
            <button 
              onClick={(e)=> {
                e.preventDefault();
                setProfile({...profile, lifestyle: "active"})}}
              className={`profile-btn ${profile.lifestyle === "active" && "selected"}`}>Active</button>
          </div>
        </div>
        <div className="profile-goal profile-card">
          <div className="profile-question">
            What are your health goals?
          </div>
          <div className="goal-answer">
            <button
              onClick={(e)=> {
              e.preventDefault();
              setProfile({...profile, goal: "Lose Weight"})}}
              className={`profile-btn ${profile.goal === "Lose Weight" && "selected"}`}>
                Lose Weight</button>
            <button 
              onClick={(e)=> {
                e.preventDefault();
                setProfile({...profile, goal: "Maintain Weight"})}}            
              className={`profile-btn ${profile.goal === "Maintain Weight" && "selected"}`}>
                Maintain Weight</button>
            <button 
              onClick={(e)=> {
                e.preventDefault();
                setProfile({...profile, goal: "Gain Weight"})}}                        
              className={`profile-btn ${profile.goal === "Gain Weight" && "selected"}`}>
                Gain Weight</button>
          </div>
        </div>
        <button className="profile-card profile-submit" type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;