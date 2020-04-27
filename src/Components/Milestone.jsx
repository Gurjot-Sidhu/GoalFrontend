import React, { Component } from 'react'
import {connect} from 'react-redux'

export class Milestone extends Component {
    
    state = {
        display: this.props.milestone.complete
    }

    handleClick = (e) =>{
        this.setState({
            display: !this.state.display
        })
        this.props.updateMilestone(this.props.milestone.name)
    }

    render() {
        return (
            <div className="milestone">
                <h2>Milestone</h2>
                {this.props.milestone.name}
                <input 
                    type="checkbox"
                    name="complete"
                    value={this.props.milestone.complete}
                    onClick={this.handleClick}
                    checked={this.state.display}
                />
            </div>
        )
    }
}
    // updateMilestone = (milestoneName) =>{
    //     return{
    //         type:"UPDATE_MILESTONE",
    //         payload: milestoneName
    //     }
    // }

    // const mstp = {
    //     updateMilestone: updateMilestone
    // }


export default connect()(Milestone)
