import React from 'react'
import { connect } from 'react-redux'
import Milestone from './Milestone.jsx'
import { withRouter } from 'react-router-dom'
import { Button } from 'primereact/button'
import { TriStateCheckbox } from 'primereact/tristatecheckbox'
import { Card } from 'primereact/card'
import { Progress } from 'semantic-ui-react'

const Goal = (props) => {
  let arrayofMilestones
  let milestoneComponents
  if (props.milestones.length > 0) {
    arrayofMilestones = props.milestones.filter((singleMilestone) => {
      return props.goal.id === singleMilestone.goal_id
    })

    milestoneComponents = arrayofMilestones.map(milestone => {
      return <Milestone key={milestone.id} milestone={milestone} />
    })
  }

  const handleView = (e) => {
    e.preventDefault()
    props.history.push(`/goals/${props.goal.id}`)
  }

  const getPercentage = () => {
    let counter = 0
    let amountCompleted = 0
    if (arrayofMilestones) {
      counter = 100 / arrayofMilestones.length
      if (counter > 100 || counter < 0) {
        return 0
      }
      arrayofMilestones.forEach(element => {
        if (element.complete === true) {
          amountCompleted++
        }
      })
    }
    return Math.round(counter * amountCompleted)
  }

  const handleClick = (e) => {
    e.preventDefault()
    props.history.push('/profile')
    fetch(`http://localhost:3000/goals/${props.goal.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `bearer ${localStorage.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props.goal)
    })
      .then(r => r.json())
      .then((r) => {
        if (r.message) {
          props.removeGoal(props.goal.name)
        }
      })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/goals/${props.goal.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `bearer ${localStorage.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props.goal)
    })
      .then(r => r.json())
      .then((r) => {
        if (r.id) {
          props.completeGoal(r)
          props.completeMiles(r)
        }
      })
  }
  return (
  
    <div className='Goal'>
      {window.location.href.includes('/profile')
        ? <Card title={props.goal.name} className='p-card-title'>
          <Progress
            percent={getPercentage()}
            indicating
          />
          <Button
            label='View'
            className='p-button-raised'
            onClick={handleView}
          />
          </Card>
        : <Card title={props.goal.name} className='p-card-title'>
          <TriStateCheckbox
            type='checkbox'
            name='complete'
            value={props.goal.complete}
            onChange={handleUpdate}
          />
          <Button
            label='Delete Goal'
            onClick={handleClick}
            id='deletebtn'
            className='p-button-raised p-button-danger'
          />
          <Progress
            percent={getPercentage()}
            indicating
          />
          {milestoneComponents}
          </Card>}
    </div>
  )
}

const removeGoal = (goal) => {
  return {
    type: 'REMOVE_GOAL',
    payload: goal
  }
}
const completeGoal = (goal) => {
  return {
    type: 'COMPLETE_GOAL',
    payload: goal
  }
}

const completeMiles = (goal) => {
  return {
    type: 'COMPLETE_GOAL_MILES',
    payload: goal
  }
}

const mstp = {
  removeGoal: removeGoal,
  completeGoal: completeGoal,
  completeMiles: completeMiles
}

export default withRouter(connect(null, mstp)(Goal))
