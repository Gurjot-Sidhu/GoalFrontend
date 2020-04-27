import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'


export class GoalForm extends Component {

    state={
        name:"",
        complete: null,
        redirect:null
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
                    this.setState({
                        redirect: "/milestone"
                    })
                }
                    
            }
            )
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }
        return (
            <form className="NewGoalForm" onSubmit={this.handleSubmit}>
                <label>Name</label>
                <input
                type="text"
                name="name"
                onChange={this.handleInputs}
                />
                <label>Completed?</label>
                <input 
                type="radio"
                name="complete"
                value="true"
                onChange={this.handleInputs}
                />
                <input
                type="radio"
                name="complete"
                value="false"
                onChange={this.handleInputs}
                />
                <input type="submit" value="Submit" />
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
