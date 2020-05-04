import React, { Component } from 'react'
import {connect} from 'react-redux'
// import { MilestoneForm } from './MilestoneForm'

export class Milestone extends Component {
    
    state = {
        display: this.props.milestone.complete
    }

    handleClick = (e) =>{
        e.preventDefault()
        this.setState(prevState =>({
            display: !prevState.display
        }))
        this.updateMilestone(this.props.milestone.name)
    }

    handleDelete = (e) =>{
        e.preventDefault()
        fetch(`http://localhost:3000/milestones/${this.props.milestone.id}`,{
            method:"DELETE",
            headers:{
                'Authorization': `bearer ${localStorage.token}`,
                'Content-Type' : 'Application/JSON'
            },
            body: JSON.stringify(this.props.milestone)
        })
            .then(r => r.json())
            .then((r)=>{
                if(r.message){
                    this.props.deleteMilestone(this.props.milestone)
                }
            })

    }
    

    handleUpdate = (e) =>{
        e.preventDefault()
        console.log(this.props.milestone)
        fetch(`http://localhost:3000/milestones/${this.props.milestone.id}`,{
            method:"PATCH",
            headers:{
                'Authorization': `bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.props.milestone)
        })
        .then(r => r.json())
        .then(this.props.updateMilestone)
    }


    render() {
        return (
            <div className="milestone">
                <h2>{this.props.milestone.name}</h2>
                 <input 
                    type="checkbox"
                    name="complete"
                    checked={this.props.milestone.complete}
                    onChange={this.handleUpdate}
                 />
             
                <button onClick={this.handleDelete}>Delete this </button>
            </div>
        )
    }
}
   const updateMilestone = (milestone) =>{
        return{
            type:"UPDATE_MILESTONE",
            payload: milestone
        }
    }

    
    const deleteMilestone = (milestone) =>{
        return{
            type: "DELETE_MILESTONE",
            payload: milestone
        }
    }

    const mstp ={
        deleteMilestone: deleteMilestone,
        updateMilestone: updateMilestone
    }

export default connect(null,mstp)(Milestone)
