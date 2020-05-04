import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

let exploreInitialState ={
  goals:[]
}

let exploreReducer = (state = exploreInitialState,action) =>{
  switch(action.type){
    case "SET_ALL":
      let exploreArray = action.payload
      return{
        ...state,
        goals: exploreArray
      }
    default:
      return state
  }
}

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
    case "DELETE_MILESTONE":
      let newmiles = state.milestones.filter((singleMilestone)=>{
        if(singleMilestone.id === action.payload.id){
          return null
        }else{
          return singleMilestone
        }
      })
      return{
        ...state,
        milestones: newmiles
      }
    case "UPDATE_MILESTONE":
      let elementIndex = state.milestones.findIndex(element => element.id === action.payload.id)
      let newCopy = [...state.milestones]
      newCopy[elementIndex] = {...newCopy[elementIndex],complete:!newCopy[elementIndex].complete}
      console.log(newCopy)
      return{
        ...state,
        milestones: newCopy
      }

    case "COMPLETE_GOAL_MILES":
      let foundmiles = state.milestones.map((singleMilestone)=>{
        if(singleMilestone.goal_id === action.payload.id){
          return {...singleMilestone,complete:action.payload.complete}
        }else{
          return singleMilestone
        }
      })
      return{
        ...state,
        milestones:foundmiles
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
    case "COMPLETE_GOAL":
      let elementIndex = state.goals.findIndex(element => element.id === action.payload.id)
      let newCopy = [...state.goals]
      newCopy[elementIndex] = {...newCopy[elementIndex],complete:!newCopy[elementIndex].complete}

      let newmiles = newCopy[elementIndex].milestones.map((singleMilestone)=>{
        return {...singleMilestone, complete: true}
      })
      console.log(newmiles)
      console.log(newCopy)
      return{
        ...state,
        goals: newCopy
      }
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
  exploreInfo: exploreReducer,
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







