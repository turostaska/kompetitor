import React, {Component} from 'react';
import SingleTeamCreation from "./singleElements/functionComponents/SingleTeamCreation";

class CreateTeams extends  Component {
    constructor() {
        super();
        this.state={
            screen: "NEUTRAL"
        }
    }

    onCreateClick = e => {
        this.setState({screen: "CREATE"});
    }
    onJoinClick = e => {
        this.setState({screen: "JOIN"});
    }

    render(){
        return(
            <div>
                <h1>Create Team or Join One</h1>
                <button onClick={this.onCreateClick}>Create</button>
                <button onClick={this.onJoinClick}>Join Team</button>
                {this.state.screen === "CREATE" ? <SingleTeamCreation/> : ""}
            </div>
        )
    }
}

export default CreateTeams;