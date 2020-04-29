import React from 'react'
import {connect} from 'react-redux'
import MilestoneForm from '../Components/MilestoneForm.jsx'
import Goal from '../Components/Goal.jsx'

const GoalPage = (props) =>{
    let foundGoal = props.goals.map((singleGoal)=>{
        let urlId = parseInt(props.history.location.pathname.substr(7))
            if(singleGoal.id === urlId){
                return <Goal key={singleGoal.name} goal={singleGoal}/>
            }else{
                return null
            }
        return foundGoal
        })  

    return (
        <div>
            Goal Page  
            {foundGoal}
            <MilestoneForm />
        </div>
        )
    }

    const mstp = (reduxState) =>{
        return {
            goals: reduxState.goalInfo.goals
        }
    }

export default connect(mstp)(GoalPage)
