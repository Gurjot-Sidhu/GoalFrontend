import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button } from 'primereact/button'

const Goal2 = (props) =>{

    const handleAdd = (e) =>{
        e.preventDefault()
        console.log("hello")
    }

    return (
        <div className='Goal'>
            <Button
                label='Add'
                className='p-button-raised'
                onClick={handleAdd}
            />

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