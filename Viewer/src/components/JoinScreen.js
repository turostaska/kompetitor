import React, {Component} from 'react';

class JoinScreen extends  Component {
    constructor() {
        super();
        this.state = {
            competitionId: 0
        }
    }

    onCompetitionIdChange = e => {
        this.setState({competitionId: Number(e.target.value)});
    }

    render(){
        return(
            <div>
                <label id='competititon_id'>Number of the competition you want to join to: </label>
                <input type='number' id="competitonId" value={this.state.competitionId} onChange={this.onCompetitonIdChange}/>
                <br/>
            </div>
        )
    }


}

export default JoinScreen;