import React, {Component} from 'react';
import NewCompetitionService from "../services/CompetitionService";

class JoinScreen extends  Component {
    constructor() {
        super();
        this.state = {
            competitionId: 0,
            success: false
        }
    }

    onCompetitionIdChange = e => {
        this.setState({competitionId: Number(e.target.value), success: false});
    }

    onJoining = () => {
        NewCompetitionService.getJoin(this.props.token, this.state.competitionId).then(result => {
            if(result.status === 200)
                this.setState({success: true});
            else
                alert("failed to join");
        });
    }

    render(){
        return(
            <div>
                <label id='competititon_id'>Number of the competition you want to join to: </label>
                <input type='number' id="competitonId" value={this.state.competitionId} onChange={this.onCompetitionIdChange}/>
                <br/>
                <button onClick={this.onJoining}>Join</button>
                <br/>
                {this.state.success === false ? "" : <h3>Successfully joined!</h3>}
            </div>
        )
    }


}

export default JoinScreen;