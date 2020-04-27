import React, { Component } from 'react'
import {connect} from 'react-redux'
import Milestone from './Milestone.jsx'


export class Goal extends Component {

    

    handleClick = (e) =>{
        this.props.removeGoal(this.props.goal.name)
    }

    render() 
        {let arrayofMilestones = this.props.goal.milestones.map((singleMilestone)=>{
            return <Milestone key ={singleMilestone} milestone={singleMilestone}/>
        })
        return (
            <div className="Goal">
                <h1>Goal</h1>
                {this.props.goal.name}{this.props.goal.complete}
                {arrayofMilestones}
                <button onClick={this.handleClick}>Delete this goal</button>
                <progress></progress>
            </div>
        )
    }
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

export default connect(null,mstp)(Goal)
