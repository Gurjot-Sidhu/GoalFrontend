import React from 'react'
import {connect} from 'react-redux'
import MilestoneForm from '../Components/MilestoneForm.jsx'
import Goal from '../Components/Goal.jsx'
import UpdateGoalForm from '../Components/UpdateGoalForm.jsx'

const GoalPage = (props) =>{
    let foundMilestones
    let foundGoal;
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
            <div>
                <UpdateGoalForm key={foundGoal.id} name={foundGoal.name} goal={foundGoal}/>
                <Goal key={foundGoal.id} goal={foundGoal} milestones={foundMilestones}/>
            </div>
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
