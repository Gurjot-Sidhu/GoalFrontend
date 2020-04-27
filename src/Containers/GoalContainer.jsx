import React from 'react'
import { connect } from 'react-redux'
import Goal from '../Components/Goal.jsx'


const GoalContainer = (props) =>{
     let arrayofComponents = props.goals.map((singleGoal)=>{
        return <Goal key={singleGoal.name} goal={singleGoal} />
     })
    return (
        <div className="GoalContainer">
            <h1>Goal Container</h1>
            {arrayofComponents}
         </div>
     )
}
    const mstp = (reduxState) =>{
        return {
            goals: reduxState.goalInfo.goals
        }
    }

export default connect(mstp)(GoalContainer)
