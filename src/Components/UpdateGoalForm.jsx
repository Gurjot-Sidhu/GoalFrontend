import React, { Component } from 'react'

export class UpdateGoalForm extends Component {

    state={
        name:""
    }

    handleAllInputs =(e) =>{
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()

        fetch("http://localhost:3000/goals",{
            method:"PATCH",
            headers:{
                'Authoriztion': `bearer ${localStorage.token}`,
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(this.state)
        })
            .then(r => r.json())
            .then(console.log)
    }

    render() {
        console.log(this.props)
        return (
            <div className="updateForm">
                <label>Rename Goal</label>
                <form onSubmit={this.handleSubmit}>
                    <input
                    type="text"
                    name="name"
                    placeholder="Name of Goal"
                    value={this.props.name}
                    onChange={this.handleAllInputs}
                    />
                    <input 
                    type="submit" value="Submit"
                    />
                </form>
            </div>
        )
    }
}

    let renameOneGoal = (goal) =>{
        return{
            type:"RENAME_ONE_GOAL",
            payload: [goal,...this.state]
        }
    }

export default UpdateGoalForm

