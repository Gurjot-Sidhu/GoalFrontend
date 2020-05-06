import React,{Component} from 'react'
import {connect} from 'react-redux'
import MilestoneForm from '../Components/MilestoneForm.jsx'
import Goal from '../Components/Goal.jsx'
import {Toolbar} from 'primereact/toolbar'
import {Button} from 'primereact/button'

export class GoalPage extends Component{

   state ={
       display:false
    }

    handleForm = (e) =>{
        e.preventDefault()
        this.setState({
            display: !this.state.display
        })
    }

    handleView = (e)=>{
        e.preventDefault()
        this.props.history.push("/profile")
    }


    render(){
        let foundMilestones
        let foundGoal = "cheese"
        if (this.props.goals.length > 0) {
            foundGoal = this.props.goals.find((singleGoal)=>{
            let urlId = parseInt(window.location.href.substr(28))
                return singleGoal.id === urlId
            })  
            foundMilestones = this.props.milestones.filter((singleMilestone)=>{ 
                let urlId = parseInt(window.location.href.substr(28))
                return singleMilestone.goal_id === urlId
            })
        }
    return (
        <div className="GoalPage">
            <Toolbar className="Toolbar">
                <div className="p-toolbar-group-left">
                    <Button
                        icon="pi pi-plus" 
                        label="New Milestone" 
                        className="p-button-raised " 
                        iconPos="left"
                        onClick={this.handleForm}
                    />
                </div>
                <div className="p-toolbar-group-right">
                    <Button
                        icon="pi pi-angle-left"
                        label="Back"
                        className="p-button-raised p-button-secondary"
                        iconPos="left"
                        onClick={this.handleView}
                    />
                </div>
            </Toolbar>
            {this.state.display
            ?<MilestoneForm id={parseInt(window.location.href.substr(28))}/>
            : <> </>
            }
            {this.props.goals.length > 0 &&  
            <div>
                <Goal goal={foundGoal} milestones={foundMilestones}/>
            </div>
            }
            
        </div>
        )

    }
}
    const mstp = (reduxState) =>{
        return {
            goals: reduxState.goalInfo.goals,
            milestones: reduxState.milestoneInfo.milestones
        }
    }

export default connect(mstp)(GoalPage)
