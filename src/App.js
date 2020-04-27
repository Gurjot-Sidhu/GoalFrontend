import React from 'react';
import './App.css';
import GoalContainer from '../src/Containers/GoalContainer.jsx'
import GoalForm from './Components/GoalForm.jsx';
import UserForm from './Components/UserForm.jsx'
import Navbar from './Components/Navbar.jsx';

import {Switch,Route,withRouter,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'



class App extends React.Component{



  componentDidMount(){
    fetch("http://localhost:3000/goals")
      .then(r => r.json())
      .then((arrayofGoals) =>{
        this.props.setAllGoals(arrayofGoals)
      })
      
    if(localStorage.token){
      this.persistUser()
    }
  }

  handleLoginSubmit = (userInfo)=>{
    fetch("http://localhost:3000/login",{
      method: "POST",
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(userInfo)
    })
    .then(r => r.json())
    .then(this.handleResponse)
  }

  handleSignUpSubmit = (userInfo)=>{
    fetch("http://localhost:3000/users",{
      method:"POST",
      headers:{
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(userInfo)
    })
      .then(r => r.json())
      .then(this.handleResponse)
  }

  

  handleResponse = (response) =>{
    if (!response.message){
      console.log(response)
      localStorage.token = response.token
      this.props.setUserInfo(response)
    }
    else{
      alert(response.message)
    }
  }

  handleLogout = (e) =>{
    localStorage.clear()
    clearUserInfo(
      {id: 0,
      token:"",
      username:""}
      )
  }


  persistUser = () =>{
    return(dispatch) =>{
      fetch("http://localhost:3000/persist",{
        method: "POST",
        headers: {
          "Authoriztion": `bearer ${localStorage.token}`
        }
      })
      .then(r => r.json())
      .then(r =>{
        localStorage.token = r.token
        dispatch(setUserInfo(r))
      })
    }
  }

  renderForm = (routerProps) =>{
    if(routerProps.location.pathname === "/login"){
      return <UserForm formName="Login" handleSubmit={this.handleLoginSubmit}/>
    }else if(routerProps.location.pathname === "/signup"){
      return <UserForm formName="Sign up" handleSubmit={this.handleSignUpSubmit}/>
    }
  }

  

  render(){
    return(
      <div className="App">
          <h1>Welcome</h1>
          <Navbar/>
          {<button onClick={this.handleLogout}>Logout</button>}
          <Switch>
              <Route path="/login" render={this.renderForm}/>
              <Route path="/signup" render={this.renderForm}/>
              <Route path="/profile" render={() =>{
                return (
                  <div>
                    <GoalForm/>
                    <GoalContainer/>
                  </div>
                  )
                }}/>
          </Switch>
      </div>
    )
  }
}

let clearUserInfo = (userInfo) =>{
  return{
    type:"LOG_USER_OUT",
    payload: userInfo
  }
}


  let setAllGoals = (allGoals) =>{
    return {
      type: "SET_ALL_GOALS",
      payload: allGoals
    }
  }

  let setUserInfo = (userInfo) =>{
    return{
      type:"SET_USER_INFO",
      payload: userInfo
    }
  }

let sendInfo = {setAllGoals,setUserInfo,clearUserInfo}

export default withRouter(connect(null,sendInfo)(App));
