import React, { Component } from 'react'
import {InputText} from 'primereact/inputtext'
export class UserForm extends Component {

    state={
        username:"",
        password:""
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.handleSubmit(this.state)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <h1>{this.props.formName}</h1>
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    autoComplete="off" 
                    name="username" 
                    tooltip="Enter your username"
                    value={this.state.username} 
                    onChange={this.handleChange}
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    autoComplete="off" 
                    name="password" 
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                <input type="Submit" value="Submit"/>
            </form>
        )
    }
}

export default UserForm
