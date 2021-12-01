import React, {Component} from 'react';
import SingleTeamCreation from "./singleElements/SingleTeamCreation";
import JoiningTeam from "./singleElements/JoiningTeam";

class CreateTeams extends  Component {
    constructor() {
        super();
        this.state={
            screen: "NEUTRAL",
            myTeam: {
                id: 0,
                name: "",
                members: []
            },
            joinedTeam: false
        }
    }

    onCreateClick = () => {
        this.setState({screen: "CREATE"});
    }
    onLeaveTeam = async() => {
        //TODO: leave team with service
        await this.setState({joinedTeam: false, myTeam: { id: 0, name: "", members: [] }, });
    }
    createTeam = (team) => {
        //TODO: create team via service
    }

    render(){
        return(
            <div>
                <h1>Create Team or Join One</h1>
                <button disabled={this.state.joinedTeam} onClick={this.onCreateClick}>Create</button>
                <button disabled={!this.state.joinedTeam} onClick={this.onLeaveTeam}>Leave Team</button>
                {this.state.screen === "CREATE" ? <SingleTeamCreation create={this.createTeam}/> : ""}
            </div>
        )
    }
}

export default CreateTeams;