import React, { Component } from 'react'
import {connect} from 'react-redux'
import Milestone from './Milestone.jsx'
import {withRouter} from 'react-router-dom'

const Goal = (props) =>{
    let arrayofMilestones
    if(props.milestones){
    // console.log(props)
    arrayofMilestones = props.milestones.map((singleMilestone)=>{
        if(props.goal.id === singleMilestone.goal_id){
            return <Milestone key ={singleMilestone.id} milestone={singleMilestone}/>
        }else{
            return null
        }
    })
}
    let handleView = (e) =>{
        e.preventDefault()
        props.history.push(`/goals/${props.goal.id}`)
    }

    let handleClick = (e) =>{
        props.removeGoal(props.goal.name)
    }
       
        return (
            <div className="Goal" >
                <h1>{props.goal.name}</h1>
                {props.location.pathname= "/profile"
                ?<button onClick={handleView}>View</button>
                :<></>
                }
                {props.goal.complete}
                {arrayofMilestones}
                <button onClick={handleClick}>Delete this goal</button>
                <progress></progress>
            </div>
        )
    
}

    const removeGoal = (goalName) =>{
        return{
            type:"REMOVE_GOAL",
            payload: goalName
        }
    }
    // const completeGoal = (goalName) =>{
    //     return{
    //         type:"COMPLETE_GOAL",
    //         payload: goalName
    //     }
    // }

    const mstp = {
        removeGoal: removeGoal
    }

export default withRouter(connect(null,mstp)(Goal))
