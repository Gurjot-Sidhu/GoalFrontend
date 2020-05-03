import React, { Component } from 'react'
import {connect} from 'react-redux'

export class MilestoneForm extends Component {
    
    state={
        name:"",
        complete:null,
        goal_id: this.props.id
    }
    
    handleInputs = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    

    handleSubmit = (e) =>{
        e.preventDefault()

        fetch("http://localhost:3000/milestones",{
            method:"POST",
            headers:{
                'Authorization': ` bearer ${localStorage.token}`,
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(this.state)
        })
            .then(r => r.json())
            .then((newMilestone)=>{
                if(newMilestone.id){
                    this.props.addOneMilestone(newMilestone)
                }
            })
    }


    render() {
        return (
            <div className="MilestoneForm">
                <h1>Create a new milestone</h1>
                <form className="NewGoalForm" onSubmit={this.handleSubmit}>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    onChange={this.handleInputs}
                />
                <label>Completed?</label>
                <label>True</label>
                <input 
                    type="radio"
                    name="complete"
                    value="true"
                    onChange={this.handleInputs}
                />
                <label>False</label>
                <input
                    type="radio"
                    name="complete"
                    value="false"
                    onChange={this.handleInputs}
                />
                <input 
                    type="hidden" 
                    name="goal_id"
                    value={this.props.id}
                />
                <input type="submit" value="Submit" />
            </form>
            </div>
        )
    }
}


let addOneMilestone = (newMilestone) =>{
    return{
        type:"ADD_ONE_MILESTONE",
        payload:newMilestone
    }
}

let mstp = {
    addOneMilestone: addOneMilestone
}

export default connect(null,mstp)(MilestoneForm)
