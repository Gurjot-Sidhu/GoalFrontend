import React, { Component } from 'react'
import {InputText} from 'primereact/inputtext'
import {Button} from 'primereact/button'
import {Link} from 'react-router-dom'
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
            <div className="LoginForm">
                <form onSubmit={this.handleSubmit}>
                    <h1>{this.props.formName}</h1>
                    <label htmlFor="username">Username</label>
                    <br></br>
                        <InputText
                            type="text" 
                            autoComplete="off" 
                            name="username" 
                            tooltip="Enter your username"
                            value={this.state.username} 
                            onChange={this.handleChange}
                        />
                    <br></br>
                    <label htmlFor="password">Password</label>
                    <br></br>
                        <InputText
                            type="password" 
                            autoComplete="off" 
                            name="password" 
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    <br></br>
                    <br></br>
                    {this.props.formName.includes("Login")
                    ?  <> <Button 
                            label="Login" 
                            type="Submit" 
                            value="Submit" 
                        />
                        <br></br>
                        <span className="reg form">
                            Don't have an account?
                            <span>
                                <Link to="/signup"> Sign Up</Link>
                            </span>
                        </span>
                        </>
                    :  <> <Button 
                            label="Sign up" 
                            type="Submit" 
                            value="Submit" 
                        />
                        <br></br>
                        <span className="reg form">
                            Don't have an account?
                            <span>
                                <Link to="/login"> Log in</Link>
                            </span>
                        </span>
                        </>
                    }
                </form>
            </div>
        )
    }
}

export default UserForm
