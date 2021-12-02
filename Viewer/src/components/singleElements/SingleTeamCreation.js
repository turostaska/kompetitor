import React, {Component} from 'react';

class SingleTeamCreation extends Component {
    constructor(props) {
        super(props);
        this.state={
            name: ""
        }
    }

    onTeamNameChange = e => {
        this.setState({name: e.target.value})
    }

    createTeam = () => {
        this.props.create( {name: this.state.name} );
    }

    render(){
        return(
            <div>
                <h3>Team Creation</h3>
                <label id='team_name'>Enter a team name:</label>
                <br/>
                <input type='text' id="team_name" value={this.state.name} onChange={this.onTeamNameChange}/>
                <button disabled={this.state.name === ""} onClick={this.createTeam}>Create</button>
            </div>
        );
    }
}
export default SingleTeamCreation