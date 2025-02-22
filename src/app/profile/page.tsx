'use client'

import React, {useState, useEffect} from 'react';
import { CircleCheck, CircleX, Venus, Mars } from 'lucide-react';
import './profile.css'


const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    age: 0,
    sex: "",
    height: { feet: 0, inches: 0, cm: 0 },
    heightUnit: "imperial",
    weight: { lbs: 0, kg: 0},
    weightUnit: "imperial",
    lifestyle: "not sure",
    goal: "no goals",
    customCalorie: 1570,
    customProtein: 120,
  });
  const [tempCalorie, setTempCalorie] = useState(profile.customCalorie);
  const [tempProtein, setTempProtein] = useState(profile.customProtein);
  const [saving, setSaving] = useState(false);
  const [heightUnit, setHeightUnit] = useState(profile.heightUnit);
  const [weightUnit, setWeightUnit] = useState(profile.weightUnit);

  useEffect(() => {
    const savedProfile = localStorage.getItem("foodLogUser");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Keep temp values up to date
  useEffect(() => {
    setTempCalorie(profile.customCalorie);
    setTempProtein(profile.customProtein);
  }, [profile])

  // allows for auto updates
  // useEffect(() => {
  //   localStorage.setItem("appLogUser", JSON.stringify(profile));
  // }, [profile]);

  // Submit Custom Calories/Protein Goal
  const submitCustom = () => {
    const updateProfile = {...profile, customCalorie: tempCalorie, customProtein: tempProtein}
    setProfile(updateProfile);
    localStorage.setItem("foodLogUser", JSON.stringify(updateProfile));
    setSaving(true);
    setTimeout(() => setSaving(false), 2000);
  }





  const handleChange = (e) => {
    setProfile({...profile, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/getCustom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: profile}), // Pass in entire profile
      });

      const res = await response.json();
      // console.log(res, res.user, typeof res.user)

      const {calories, protein, heightUnit, weightUnit} = res.user
      const updateProfile = {...profile, customCalorie: calories, customProtein: protein, heightUnit: heightUnit, weightUnit: weightUnit}
      console.log(updateProfile)
      setProfile(updateProfile);
      localStorage.setItem("foodLogUser", JSON.stringify(updateProfile));
      if (!response.ok) {
        console.error("API Error:", res.error || "Failed to fetch stats.");
        return;
      }
    } catch (error) {
      console.error("Error fetching calorie data:", error);
    }


    // localStorage.setItem("foodLogUser", JSON.stringify(profile));
  };

  return (
    <div className="profile-container">
      <div className="custom-goals">
        <h1>Set Your Own Goals:</h1>
        <p>If you already know your target calorie and protein intake, enter them below to track your progress.</p>
        <div className="custom-answers">
          <div className="custom-calorie">
            Calories: <input type="number" value={tempCalorie}
              onChange={(e) => setTempCalorie(Number(e.target.value))}
              disabled={saving}
              min={0} step={10} autoFocus/> 
          </div>
          <div className="custom-protein">
            Protein <input type="number" value={tempProtein} 
              onChange={(e) => setTempProtein(Number(e.target.value))}
              disabled={saving}
              min={0} step={1}/> g 
          </div>
        </div>

          {
            saving ?
            <p className="profile-feedback">Saved!</p>
            :
            <div className="profile-options">
              <CircleCheck className="profile-action" 
                onClick={() => submitCustom()}
                style={{color: "green"}} />
              <CircleX className="profile-action" 
                onClick={() => {setTempCalorie(0); setTempProtein(0)}}
                style={{color: "crimson"}}/>
            </div>
          }
      </div>

      <div className="info-form">
        <h1>Get a Personalized Plan:</h1>
        <p>Not sure what your targets should be? Enter your details, and we'll estimate your daily calorie and protein needs based on your body, lifestyle, and goals.</p>
        {/* <div className="">Not sure? Fill in the form below and FoodLogAI will give you an estimate.</div> */}
        <form onSubmit={handleSubmit}>
          <div className="profile-name profile-card">
            <div className="profile-question">
              What's your name?
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
              <div className="sex-female">
                <Venus className="sex-icon"/>
                <button onClick={(e)=> {
                  e.preventDefault();
                  setProfile({...profile, sex: "female"})
                }} className={`profile-btn ${profile.sex === "female" && "selected"}`}>
                  Female</button>
              </div>
              <div className="sex-male">
                <Mars className="sex-icon"/>
                <button onClick={(e) => {
                  e.preventDefault();
                  setProfile({...profile, sex: "male"})
                }} className={`profile-btn ${profile.sex === "male" && "selected"}`}>
                  Male</button>
              </div>
            </div>
          </div>
          <div className="profile-height profile-card">
            <div className="profile-question">
              What is your height?
            </div>
            <div className="height-answer">
              {heightUnit === "imperial" ? 
                <div className="height-imperial">
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
              :
              <div className="height-metric">
                <input name="cm" value={profile.height.cm} 
                  onChange={e => {
                    setProfile({...profile, height: {...profile.height, [e.target.name]: e.target.value}})
                  }}
                  type="number" step="1" min="0" max="300"/> cm
              </div>
          
            }
            </div>
            <div className="height-option">
              <div className={`profile-btn ${heightUnit === "imperial" ? "selected" : ""}`} onClick={() => setHeightUnit("imperial")}>ft/in</div>
              <div className={`profile-btn ${heightUnit === "metric" ? "selected" : ""}`} onClick={() => setHeightUnit("metric")}>cm</div>
            </div>
          </div>
          <div className="profile-weight profile-card">
            <div className="profile-question">
              How much do you weight?
            </div>
            <div className="weight-answer">
              {weightUnit === "imperial" ?
                <div className="weight-imperial">
                  <input name="lbs" value={profile.weight.lbs} 
                  onChange={(e) => setProfile({...profile, weight: {...profile.weight, [e.target.name] : e.target.value}})} 
                  type="number" step="1" min="1" max="500" required/> lbs
                </div> 
                :
                <div className="weight-metric">
                  <input name="kg" value={profile.weight.kg} 
                    onChange={(e) => setProfile({...profile, weight: {...profile.weight, [e.target.name] : e.target.value}})} 
                    type="number" step="1" min="1" max="500" required/> kg
                </div>
              }
            </div>
            <div className="weight-options">
              <div className={`profile-btn ${weightUnit === "imperial" ? "selected" : ""}`} onClick={() => setWeightUnit("imperial")}>lbs</div>
              <div className={`profile-btn ${weightUnit === "metric" ? "selected" : ""}`} onClick={() => setWeightUnit("metric")}>kg</div>
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

    </div>
  );
};

export default Profile;