import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button } from 'primereact/button'
import {TriStateCheckbox} from 'primereact/tristatecheckbox'


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
                <TriStateCheckbox 
                            type="checkbox"
                            name="complete"
                            value={this.props.milestone.complete}
                            onChange={this.handleUpdate}
                />
                <label className="Milestonename">
                    {this.props.milestone.name}
                </label>
              
                <div className="milebuttons">
                  
                        <Button 
                            label="Delete Milestone" 
                            onClick={this.handleDelete} 
                            className="p-button-raised p-button-danger">
                        </Button>
                </div>
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
