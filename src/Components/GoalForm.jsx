import React, { Component } from 'react'
import {connect} from 'react-redux'
import {InputText} from 'primereact/inputtext'
import {RadioButton} from 'primereact/radiobutton'
import {Button} from 'primereact/button'

export class GoalForm extends Component {

    state={
        name:"",
        complete: null
    }

    handleInputs = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()

        fetch("http://localhost:3000/goals",{
            method:"POST",
            headers: {
                'Authorization': `bearer ${localStorage.token}`,
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(this.state)
        })
            .then(r => r.json())
            .then((newGoal) =>{
                if(newGoal.id){
                    this.props.addOneGoal(newGoal)
                    this.props.history.push(`/goals/${newGoal.id}`)
                    this.setState({
                        name:"",
                        complete: null
                    })
                }
            }
           
            )
    }

    render() {
        return (
            <form className="GoalForm" onSubmit={this.handleSubmit}>
            <img src="https://smartcaresoftware.com/wp-content/uploads/2019/11/SMART-goals-1536x792.jpg"/>
                <span className="Goalname">
                    <h3 className="first">Name of Goal</h3>
                    <InputText
                        id="in"
                        name="name"
                        onChange={this.handleInputs}
                    />
                </span>
                
                <div className="p-col-12">
                <label>Completed?</label>
                    <RadioButton
                        inputId="Yes"
                        name="complete"
                        value={true}
                        onChange={this.handleInputs}
                        checked={this.state.complete === true}
                    />
                    <label htmlFor="Yes" className="p-radiobutton-label">Yes</label>
                    <RadioButton
                        inputId="Not yet"
                        name="complete"
                        value={false}
                        onChange={this.handleInputs}
                        checked={this.state.complete === false}
                    />
                    <label htmlFor="Not yet" className="p-radiobutton-label">Not yet</label>
                </div>
                <Button label="Submit" type="submit" value="Submit" className="p-button-raised p-button-success"/>
            </form>
        )
    }
}

let addOneGoal = (newGoal) =>{
    return{
        type:"ADD_ONE_GOAL",
        payload:newGoal
    }
}

let mstp = {
    addOneGoal: addOneGoal
}

export default connect(null,mstp)(GoalForm)
