import React from 'react'
import {connect} from 'react-redux'
import MilestoneForm from '../Components/MilestoneForm.jsx'
import Goal from '../Components/Goal.jsx'

const GoalPage = (props) =>{
    let foundMilestones
    let foundGoal;
    console.log("hey")
    if (props.goals.length > 0) {
        foundGoal = props.goals.find((singleGoal)=>{
        let urlId = parseInt(window.location.href.substr(28))
            return singleGoal.id === urlId
        })  
        foundMilestones = props.milestones.filter((singleMilestone)=>{ 
            return singleMilestone.goal_id === foundGoal.id
        })
    }

    return (
        <div className="GoalPage">
            Goal Page  
            {props.goals.length > 0 &&
            <Goal key={foundGoal.id} goal={foundGoal} milestones={foundMilestones}/>
            }
            <MilestoneForm id={parseInt(window.location.href.substr(28))}/>
        </div>
        )
    }

    const mstp = (reduxState) =>{
        return {
            goals: reduxState.goalInfo.goals,
            milestones: reduxState.milestoneInfo.milestones
        }
    }

export default connect(mstp)(GoalPage)
