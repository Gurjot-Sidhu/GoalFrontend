import React, { Component } from 'react'
import {connect} from 'react-redux'
import {InputText} from 'primereact/inputtext'
import {RadioButton} from 'primereact/radiobutton'
import {Button} from 'primereact/button'


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
                <form className="NewMilestoneForm" onSubmit={this.handleSubmit}>
                    <span className="p-float-label">
                        <h3 className="first">Name of Milestone</h3>
                        <InputText
                            id="in"
                            name="name"
                            onChange={this.handleInputs}
                        />
                    </span>
                    <div className="p-col-12">
                    <label>Completed?</label>
                        <RadioButton
                            type="radio"
                            name="complete"
                            value={true}
                            onChange={this.handleInputs}
                            checked={this.state.complete === true}
                        />
                    <label htmlFor="Yes" className ="p-radiobutton-label">Yes</label>
                    <RadioButton
                        type="radio"
                        name="complete"
                        value={false}
                        onChange={this.handleInputs}
                        checked={this.state.complete === false}
                    />
                    <label htmlFor="Not yet" className ="p-radiobutton-label">Not Yet</label>
                </div>
                <Button label="Submit" type="submit" value="Submit" className="p-button-raised p-button-success"/>
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
