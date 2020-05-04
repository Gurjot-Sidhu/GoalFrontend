import React from 'react'
import { connect } from 'react-redux'

const ExplorePage = (props) => {

    let arrayofGoals = props.goals.map((singleGoal)=>{
        return <Goal key = {singleGoal.id} goal={singleGoal} milestones={props.milestones} />
    })
        return (
            <div className="ExplorePage">
                <h1>ExplorePage</h1>
                {arrayofGoals}
            </div>
        )
}
    const mstp = (reduxState) =>{
        return{
            goals: reduxState.exploreInfo.goals,
            milestones: reduxState.milestoneInfo.milestones
        }
    }



export default connect(mstp)(ExplorePage)
