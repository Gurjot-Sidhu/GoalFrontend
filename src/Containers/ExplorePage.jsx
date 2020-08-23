import React from 'react'
import { connect } from 'react-redux'
import Goal2 from '../Components/Goal2.jsx'

const ExplorePage = (props) => {
  // take in props from index page
  const arrayofGoals = props.goals.map((singleGoal) => {
    return <Goal2 key={singleGoal.id} goal={singleGoal} milestones={props.milestones} />
  })
  return (
    <div className='ExplorePage'>
      <h1>ExplorePage</h1>
      {arrayofGoals}
    </div>
  )
}
const mstp = (reduxState) => {
  return {
    goals: reduxState.exploreInfo.goals,
    milestones: reduxState.milestoneInfo.milestones
  }
}

export default connect(mstp)(ExplorePage)
