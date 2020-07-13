import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'

const Goal2 = (props) =>{

    const handleAdd = (e) =>{
        e.preventDefault()
        
        fetch("http://localhost:3000/goals",{
            method:"POST",
            headers:{
                    'Authorization': `bearer ${localStorage.token}`,
                    'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify()
        })
        .then(r => r.json())
        .then(console.log)
    }


    return (
        <div className='Goal'>
            <Card title ={props.goal.name} className='p-card-title'>
            <Button
                label='Add'
                className='p-button-raised'
                onClick={handleAdd}
            />
            </Card>
        </div>
    )
}

const addGoal = (goal2) =>{
    return{
        type: 'ADD_EXPLORE_GOAL',
        payload: goal2
    }
}


const mstp = {
    addGoal: addGoal
}

export default withRouter(connect(null,mstp)(Goal2))