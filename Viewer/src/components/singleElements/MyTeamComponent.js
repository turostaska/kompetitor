import React, {Component} from 'react';
import SingleMember from "./functionComponents/SingleMember";
import SingleReferee from "./functionComponents/SingleReferee";

class MyTeamComponent extends Component {
    constructor(props) {
        super(props);
    }
    render(){
            let memberDisplay = () => {
                return(
                    <ul>
                        {this.props.team.members.map((m) => {
                        return (<SingleMember member={m}/>);
                    }) }
                    </ul>
                );
            }
        return(
            <div>
                <h2>Your Team</h2>
                <h4>Name:</h4>
                <p>{this.props.team.name}</p>
                <h4>Member list: </h4>
                {this.props.team.members.length === 0 ? <p>No members yet</p> : memberDisplay()}
            </div>
        );
    }
}
export default MyTeamComponent