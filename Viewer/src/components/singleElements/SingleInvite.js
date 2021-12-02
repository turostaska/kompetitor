import React, {Component} from 'react';

class SingleInvite extends Component {
    constructor(props) {
        super(props);

    }

    onAccept = () => {
        this.props.accept(this.props.invite);
    }

    render (){
        return(
            <tr>
                <td>{this.props.invite.id}</td>
                <td>{this.props.invite.team.name}</td>
                <td>{this.props.invite.user.username}</td>
                <td> <button disabled={this.props.joinedTeam} onClick={this.onAccept}>ACCEPT</button></td>
            </tr>
        );
    }
}
export default SingleInvite