import React, { Component } from 'react'
import {connect} from 'react-redux'
import { MilestoneForm } from './MilestoneForm'

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
        console.log(this.props.milestone)
        fetch("http://localhost:3000/milestones",{
            method:"DELETE",
            headers:{
                'Authorization': `bearer ${localStorage.token}`,
                'Content-Type' : 'Application/JSON'
            },
            body: JSON.stringify(this.props.milestone)
        })
            .then(r => r.json())
            .then(console.log)

    }
        // fetch("http://localhost:3000/milestones",{
        //     method:"DELETE",
        //     headers:{
        //         'Authorization': ` bearer ${localStorage.token}`,
        //         'Content-Type': 'Application/JSON'
        //     },
        //     body: JSON.stringify(this.props.milestone)
        // })
        //     .then(r => r.json())
        //     .then((r)=>{
        //         if(r){
        //             console.log(r)
        //             this.props.deleteMilestone(this.props.milestone)
        //         }
        //     })
            // .then((newMilestone)=>{
            //     if(newMilestone.id){
            //         this.props.addOneMilestone(newMilestone)
            //     }
            // })
    

    render() {
        return (
            <div className="milestone">
                <h2>{this.props.milestone.name}</h2>
                <input 
                    type="checkbox"
                    name="complete"
                    value={this.props.milestone.complete}
                    // onClick={this.handleClick}
                    // checked={this.state.display}
                />
                <button onClick={this.handleDelete}>Delete this </button>
            </div>
        )
    }
}
    // updateMilestone = (milestoneName) =>{
    //     return{
    //         type:"UPDATE_MILESTONE",
    //         payload: milestoneName
    //     }
    // }

    // const mstp = {
    //     updateMilestone: updateMilestone
    // }

    const deleteMilestone = (milestone) =>{
        return{
            type: "DELETE_MILESTONE",
            payload: milestone
        }
    }

    const mstp ={
        deleteMilestone: deleteMilestone
    }

export default connect(null,mstp)(Milestone)
