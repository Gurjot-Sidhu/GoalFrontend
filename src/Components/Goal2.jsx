import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import Goal from './Goal'
import { Button } from 'primereact/button'

const Goal2 = (props) =>{

    const handleAdd = (e) =>{
        e.preventDefault()
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



const mstp = {
    addGoal: addGoal
}

export default withRouter(connect(null,mstp)(Goal))