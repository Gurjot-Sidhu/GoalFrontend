import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'



let milestoneInitialState ={
  milestones:[]
}

let milestoneReducer = (state = milestoneInitialState,action) =>{
  switch (action.type) {
    case "SET_ALL_MILESTONES":
      let milestoneArray = action.payload
      return{
        ...state,
        milestones: milestoneArray
      }
    case "ADD_ONE_MILESTONE":
      let newArr = [...state.milestones,action.payload]
      return{
        ...state,
        milestones: newArr
      }
    default:
      return state
  }
}

let goalInitialState ={
  goals:[]
}

let goalReducer = (state = goalInitialState,action) =>{
  switch (action.type) {
    case "SET_ALL_GOALS":
      let goalsArray = action.payload
      return {
        ...state,
        goals: goalsArray
      }
    case "REMOVE_GOAL":
      let goalName = action.payload
      let filteredGoals = state.goals.filter((goal)=>{
        return goal.name !== goalName
       })
        return {
          ...state,
           goals:filteredGoals
         }
    case "ADD_ONE_GOAL":
      let newGoal = action.payload
      let copyGoals = [...state.goals,newGoal]
        return{
          ...state,
          goals:copyGoals
        }
    case "REMOVE_ALL_GOALS":
        return{
          ...state,
          goals:[]
        }
    // case "ADD_ONE_MILESTONE":
    //   let goalId = action.payload.goal_id
    //   let foundGoal = state.goals.filter((singleGoal)=>{
    //     if(singleGoal.id === goalId){
    //       console.log(foundGoal)
    //       return singleGoal
    //     }else{
    //       return null
    //     }
    //   })
    //   let newmiles = [foundGoal.milestones,action.payload]
    //   let newstate = state.goals.map((singleGoal)=>{
    //     if(singleGoal.id === goalId){
    //       return newmiles
    //     }else{
    //       return singleGoal
    //     }
    //   })
    //   return{
    //     ...state,
    //     goals: newstate
    //   }
    default:
      return state
  }
}

let userInitialState ={
  id: 0,
  token:"",
  username:""
}

let userReducer = (state = userInitialState,action) =>{
  switch(action.type){
    case "SET_USER_INFO":
      return {
        ...state,
        id: action.payload.user.id,
        username: action.payload.user.username,
        token: action.payload.token
      }
    case "LOG_USER_OUT":
      return {
        ...state,
        id:0,
        token:"",
        username:""
      }
    default:
      return state
  }
}


let rootReducer = combineReducers({
  milestoneInfo: milestoneReducer,
  goalInfo: goalReducer,
  userInfo: userReducer
})

let storeObj = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


ReactDOM.render(
  <BrowserRouter>
    <Provider store={storeObj}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);







