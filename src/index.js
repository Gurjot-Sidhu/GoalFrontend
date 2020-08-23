import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

const exploreInitialState = {
  goals: []
}

const exploreReducer = (state = exploreInitialState, action) => {
  switch (action.type) {
    case 'SET_ALL':
      const exploreArray = action.payload
      return {
        ...state,
        goals: exploreArray
      }
    default:
      return state
  }
}

const milestoneInitialState = {
  milestones: []
}

const milestoneReducer = (state = milestoneInitialState, action) => {
  switch (action.type) {
    case 'SET_ALL_MILESTONES':
      const milestoneArray = action.payload
      return {
        ...state,
        milestones: milestoneArray
      }
    case 'ADD_ONE_MILESTONE':
      const newArr = [...state.milestones, action.payload]
      return {
        ...state,
        milestones: newArr
      }
    case 'DELETE_MILESTONE':
      const newmiles = state.milestones.filter((singleMilestone) => {
        if (singleMilestone.id === action.payload.id) {
          return null
        } else {
          return singleMilestone
        }
      })
      return {
        ...state,
        milestones: newmiles
      }
    case 'UPDATE_MILESTONE':
      const elementIndex = state.milestones.findIndex(element => element.id === action.payload.id)
      const newCopy = [...state.milestones]
      newCopy[elementIndex] = { ...newCopy[elementIndex], complete: !newCopy[elementIndex].complete }
      console.log(newCopy)
      return {
        ...state,
        milestones: newCopy
      }

    case 'COMPLETE_GOAL_MILES':
      const foundmiles = state.milestones.map((singleMilestone) => {
        if (singleMilestone.goal_id === action.payload.id) {
          return { ...singleMilestone, complete: action.payload.complete }
        } else {
          return singleMilestone
        }
      })
      return {
        ...state,
        milestones: foundmiles
      }
    default:
      return state
  }
}

const goalInitialState = {
  goals: []
}

const goalReducer = (state = goalInitialState, action) => {
  switch (action.type) {
    case 'SET_ALL_GOALS':
      const goalsArray = action.payload
      return {
        ...state,
        goals: goalsArray
      }
    case 'ADD_EXPLORE_GOAL':
      const nGoal = action.payload
      const coGoals = [...state.goals, nGoal]
      return{
        ...state,
        goals: nGoal
      }
    case 'REMOVE_GOAL':
      const goalName = action.payload
      const filteredGoals = state.goals.filter((goal) => {
        return goal.name !== goalName
      })
      return {
        ...state,
        goals: filteredGoals
      }
    case 'ADD_ONE_GOAL':
      const newGoal = action.payload
      const copyGoals = [...state.goals, newGoal]
      return {
        ...state,
        goals: copyGoals
      }
    case 'REMOVE_ALL_GOALS':
      return {
        ...state,
        goals: []
      }
    case 'COMPLETE_GOAL':
      const elementIndex = state.goals.findIndex(element => element.id === action.payload.id)
      const newCopy = [...state.goals]
      newCopy[elementIndex] = { ...newCopy[elementIndex], complete: !newCopy[elementIndex].complete }

      const newmiles = newCopy[elementIndex].milestones.map((singleMilestone) => {
        return { ...singleMilestone, complete: true }
      })
      console.log(newmiles)
      console.log(newCopy)
      return {
        ...state,
        goals: newCopy
      }
    default:
      return state
  }
}

const userInitialState = {
  id: 0,
  token: '',
  username: ''
}

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        id: action.payload.user.id,
        username: action.payload.user.username,
        token: action.payload.token
      }
    case 'LOG_USER_OUT':
      return {
        ...state,
        id: 0,
        token: '',
        username: ''
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  exploreInfo: exploreReducer,
  milestoneInfo: milestoneReducer,
  goalInfo: goalReducer,
  userInfo: userReducer
})

const storeObj = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <BrowserRouter>
    <Provider store={storeObj}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
