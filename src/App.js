import React from 'react';
import './App.css';
import GoalContainer from '../src/Containers/GoalContainer.jsx'
import GoalForm from './Components/GoalForm.jsx';
import UserForm from './Components/UserForm.jsx'
import Navbar from './Components/Navbar.jsx';

import {Switch,Route,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import GoalPage from './Containers/GoalPage';

import 'primereact/resources/themes/nova-light/theme.css'

class App extends React.Component{


  state={
    login:false
  }

  componentDidMount(){
    if(localStorage.token){
      this.persistUser()
    }
  }

  persistUser = () =>{
      fetch("http://localhost:3000/persist",{
        method: "POST",
        headers: {
          "Authorization": `bearer ${localStorage.token}`
        }
      })
      .then(r => r.json())
      .then(r =>{
          this.handleResponse(r)
      })
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
      this.setState({
        login:true
      })
      let newmiles = []
      let milestones= response.user.goals.map((singleGoal)=>{
        if(singleGoal.milestones){
          singleGoal.milestones.map((oneMile)=>{
            newmiles.push(oneMile)
          })
        }else{
          return null
        }
      return newmiles
      })
      localStorage.token = response.token
      this.props.setUserInfo(response)
      this.props.setAllGoals(response.user.goals)
      this.props.setAllMilestones(newmiles)
      this.props.history.push("/profile")
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
      clearGoals()
      this.props.history.push("/login")
      this.setState({
        login:false
      })
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
          <Navbar handleLogout={this.handleLogout} login={this.state.login}/>
          <Switch>
              <Route path="/login" render={this.renderForm}/>
              <Route path="/signup" render={this.renderForm}/>
              <Route path="/goals/:id" component={GoalPage} />
              <Route path="/profile" render={() =>{
                if(localStorage.token){
                  return (
                    <div>
                      <GoalForm history={this.props.history}/>
                      <GoalContainer />
                    </div>
                    )}
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

  let clearGoals = () =>{
    return{
      type:"REMOVE_ALL_GOALS"
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

  let setAllMilestones = (allMilestones) =>{
    return{
      type:"SET_ALL_MILESTONES",
      payload: allMilestones
    }
  }

let sendInfo = {setAllGoals,setUserInfo,clearUserInfo,setAllMilestones,clearGoals}

export default withRouter(connect(null,sendInfo)(App));
