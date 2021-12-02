import React, {Component} from 'react';
import SingleTeamCreation from "./singleElements/SingleTeamCreation";
import MyTeamComponent from "./singleElements/MyTeamComponent";
import NewTeamService from "../services/TeamService";

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
            joinedTeam: false,
            loaded: false
        }
    }

    onCreateClick = () => {
        this.setState({screen: "CREATE"});
    }
    onLeaveTeam = () => {
        NewTeamService.getLeave(this.props.token).then(async(result) => {
            if(result.status === 200)
                await this.setState({joinedTeam: false, myTeam: {id: 0, name: "", members: []}, loaded: true});
            else
                alert("fail when leaving team")
        })
    }
    createTeam = (team) => {
        NewTeamService.postCreate(this.props.token, team).then(async(result) => {
            if(result.status === 200)
                await this.setState({joinedTeam: true, loaded: true, myTeam: result.data, screen: "NEUTRAL"});
            else
                alert( "fail at team creation");
        })
    }
    loadTeam = () => {
        this.fillTeam()

    }

    fillTeam = async() => {
        NewTeamService.getMyTeam(this.props.token).then( async(result) => {
            if(result.status===200){
                for(var i=0; i<result.data.length; i++){
                    for(var j=0; j<result.data[i].members.length; j++){
                        if(result.data[i].members[j].username === this.props.username){
                            await this.setState({myTeam: {id: result.data[i].id, name: result.data[i].name, members: result.data[i].members},
                                loaded: true, joinedTeam: true});
                            return;
                        }
                    }
                }
                this.setState({loaded: true, joinedTeam: false})
            }
            else
                alert("fail when getting all teams")
        })
    }

    render(){
        let myTeamDisplay = () => {
            return (<MyTeamComponent team={this.state.myTeam} />);
        }
        return(
            <div>
                <h1>Create Team or Leave your team and join One</h1>
                <button disabled={this.state.joinedTeam || !this.state.loaded} onClick={this.onCreateClick}>Create</button>
                <button disabled={!this.state.joinedTeam || !this.state.loaded} onClick={this.onLeaveTeam}>Leave Team</button>
                {this.state.loaded=== true ? "" : this.loadTeam()}
                {this.state.screen === "CREATE" ? <SingleTeamCreation create={this.createTeam}/> : ""}
                {this.state.joinedTeam === false ? <p>You don't have a team. Create one, or check your invites and join one</p> : myTeamDisplay() }
            </div>
        )
    }
}

export default CreateTeams;