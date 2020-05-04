import React from 'react'
import {connect} from 'react-redux'
import MilestoneForm from '../Components/MilestoneForm.jsx'
import Goal from '../Components/Goal.jsx'

const GoalPage = (props) =>{
    let foundMilestones
    let foundGoal = "cheese"
    if (props.goals.length > 0) {
        // console.log(props.goals)
        foundGoal = props.goals.find((singleGoal)=>{
        let urlId = parseInt(window.location.href.substr(28))
            return singleGoal.id === urlId
        })  
        foundMilestones = props.milestones.filter((singleMilestone)=>{ 
            // console.log(foundGoal)
            let urlId = parseInt(window.location.href.substr(28))
            return singleMilestone.goal_id === urlId
        })
    }
    // console.log(foundGoal)
    return (
        <div className="GoalPage">
            Goal Page  
            
            {props.goals.length > 0 &&  
            <div>
                <Goal goal={foundGoal} milestones={foundMilestones}/>
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
