import React from 'react'
import { connect } from 'react-redux'
import Goal from '../Components/Goal.jsx'


const GoalContainer = (props) =>{
        let arrayofComponents = props.goals.map((singleGoal)=>{
        return <Goal key={singleGoal.name} goal={singleGoal} milestones={props.milestones}/>
     })
    return (
        <div className="GoalContainer">
            <h1>Your Goals</h1>
            {arrayofComponents}
         </div>
     )
    }
    const mstp = (reduxState) =>{
        return {
            goals: reduxState.goalInfo.goals,
            milestones: reduxState.milestoneInfo.milestones
        }
    }

export default connect(mstp)(GoalContainer)
