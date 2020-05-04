import React from 'react'
import {connect} from 'react-redux'
import Milestone from './Milestone.jsx'
import {withRouter} from 'react-router-dom'
import {ProgressBar} from 'primereact/progressbar';



const Goal = (props) =>{
    let arrayofMilestones
    if(props.milestones.length > 0){
    arrayofMilestones = props.milestones.map((singleMilestone)=>{
        if(props.goal.id === singleMilestone.goal_id){
            console.log(singleMilestone)
            return <Milestone key ={singleMilestone.id} milestone={singleMilestone}/>
        }else{
            return null
        }
    })
}
    let handleView = (e) =>{
        e.preventDefault()
        props.history.push(`/goals/${props.goal.id}`)
    }

    let getPercentage = () => {
        console.log(arrayofMilestones)
        return 90
    }

    let handleClick = (e) =>{
        e.preventDefault()
        props.history.push("/profile")
        fetch(`http://localhost:3000/goals/${props.goal.id}`,{
            method:"DELETE",
            headers:{
                "Authorization": `bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(props.goal)
        })
            .then(r => r.json())
            .then((r) =>{
                if(r.message){
                    props.removeGoal(props.goal.name)
                }
            })
    }
       
    let handleUpdate = (e) =>{
        e.preventDefault()
        fetch(`http://localhost:3000/goals/${props.goal.id}`,{
            method:"PATCH",
            headers:{
                "Authorization": `bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(props.goal)
        })
            .then(r => r.json())
            .then((r)=>{
                if(r.id){
                    props.completeGoal(r)
                    props.completeMiles(r)
                }
            })
    }
        return (
            <div className="Goal" >
                <h1>{props.goal.name}</h1>
                {window.location.href.includes("/profile")
                ?<button onClick={handleView}>View</button>
                :   <>
                    <input 
                        type="checkbox"
                        name="complete"
                        checked={props.goal.complete}
                        onChange={handleUpdate}
                       
                    />
                        <button onClick={handleClick}>Delete this goal</button>
                    </>
                }
                
                {window.location.href.includes("/profile") 
                ? <></>
                : arrayofMilestones
                }
                <ProgressBar 
                mode="determinate"
                value={getPercentage()}
                >
                </ProgressBar>
            </div>
        )
    
}

    const removeGoal = (goal) =>{
        return{
            type:"REMOVE_GOAL",
            payload: goal
        }
    }
    const completeGoal = (goal) =>{
        return{
            type:"COMPLETE_GOAL",
            payload: goal
        }
    }

    const completeMiles = (goal) =>{
        return{
            type: "COMPLETE_GOAL_MILES",
            payload: goal
        }
    }

    const mstp = {
        removeGoal: removeGoal,
        completeGoal: completeGoal,
        completeMiles: completeMiles
    }

export default withRouter(connect(null,mstp)(Goal))
