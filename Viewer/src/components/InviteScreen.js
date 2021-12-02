import React, {Component} from 'react';
import NewTeamService from "../services/TeamService";
import SingleInvite from "./singleElements/SingleInvite";
import NewInviteService from "../services/InviteService";

class InviteScreen extends  Component {
    constructor(props) {
        super(props);
        this.state={
            invites: [],
            joinedTeam: false,
            teamCheck: this.hasTeam,
            invitee: ""
        }
        this.hasTeam();
    }

    findTeam = ( ) => {
        NewTeamService.getMyTeam(this.props.token).then( async(result) => {
            if(result.status===200){
                for(var i=0; i<result.data.length; i++){
                    for(var j=0; j<result.data[i].members.length; j++){
                        if(result.data[i].members[j].username === this.props.username){
                            await this.setState({joinedTeam: true});
                            return;
                        }
                    }
                }
                this.setState({joinedTeam: false})
            }
            else
                alert("fail when getting all teams")
        })
    }

    hasTeam = () => {
        this.findTeam();
    }

    onUserNameChange = e => {
        this.setState({invitee: e.target.value})
    }

    joinToTeam = (invite) => {
        NewInviteService.postAcceptInvite(this.props.token, invite).then( async(result) => {
            if(result.status === 200) {
                await this.setState({joinedTeam: true});
                await this.hasTeam();
                await this.loadInvites();
            }
        })
    }

    inviteToTeam = () => {
        NewInviteService.postSendInvite(this.props.token, {username: this.state.invitee}).then(result => {
            if(result.status === 200)
                this.setState({invitee: ""})
            else
                alert("fail when sending invite");

        });
    }

    loadInvites = () => {
        this.fillInvites();
    }

    fillInvites = () => {
        NewInviteService.getMyInvites(this.props.token).then(async(result) => {
            if(result.status === 200){
                for (var i = 0; i < result.data.length; i++) {
                    if(i === 0)
                        await this.setState({
                            invites: [result.data[i]]
                        });
                    else
                        await this.setState({
                            invites: [...this.state.invites, result.data[i]]
                        });
                }
            }
            else
                alert("fail when getting invites");
        })
    }

    render(){
        let inviteSomeone = () => {
            return (
                <div>
                    <h2>Invite someone to your team by their username</h2>
                    <h2>You can only send 1 invite to someone</h2>
                    <br/>
                    <input type='text' id="username" value={this.state.invitee} onChange={this.onUserNameChange}/>
                    <button disabled={this.state.invitee === "" || !this.state.joinedTeam} onClick={this.inviteToTeam}>Invite</button>
                </div>
            );
        }

        let inviteListDisplay = this.state.invites.map((i) => {
               return( <SingleInvite accept={this.joinToTeam} invite={i} joinedTeam={this.state.joinedTeam}/> );
        })

        return(
            <div>
            <h1>Your Team Invites</h1>
            {this.state.joinedTeam === true ? inviteSomeone() : ""}
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <td> </td>
                        <td>Team</td>
                        <td> </td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.invites.length === 0 ? this.loadInvites() : ""}
                    { this.state.invites.length === 0 ? "" : inviteListDisplay}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default InviteScreen;