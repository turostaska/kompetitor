import React, {Component} from 'react';
import SingleStage from "./SingleStage";
import SingleCompetitor from "./functionComponents/SingleCompetitor";
import SingleReferee from "./functionComponents/SingleReferee";
import {Dropdown, DropdownButton} from "react-bootstrap";

class SingleCompetition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            stages: this.props.competition.stages,
        }
    }

    openState = () => {
        this.setState({open: !this.state.open});
    }

    render(){
        let singleStateDisplay = this.state.stages.map((s) => {
           return( <SingleStage stage={s} placeholder={this.props.competition}/>);
        });
        let singleCompetitorDisplay = this.props.competition.competitors.map((com) => {
              return(
                  <SingleCompetitor competitor={com} />
              );
        });
        let singleRefereeDisplay = this.props.competition.referees.map((ref) => {
            return( <SingleReferee referee={ref}/> );
        });
        return(<tbody>
            <tr>
                <td>{this.props.competition.id}</td>
                <td><button onClick={this.openState}>{this.state.open === true ? "-" : "+"}</button></td>
                <td>{this.props.competition.admin.username}</td>
                <td>{this.props.competition.competitorLimit}</td>
                <td>{this.props.competition.startDate}</td>
                <td>{this.props.competition.type}</td>
                <td>{this.state.length === 0 ? "No stages to show" : "Click the Expand button to see every stage and its matches"}</td>
                <td>
                    <select value="Competitors">
                        <option>Competitors</option>
                        {this.props.competition.competitors.length === 0 ? <option>"No competitors"</option> : singleCompetitorDisplay}
                    </select>
                </td>
                <td>
                    <select value="Referees">
                        <option>Referees</option>
                        {this.props.competition.referees.length === 0 ? <option>"No referees"</option> : singleRefereeDisplay}
                    </select>
                </td>
            </tr>
            {this.state.open === false ? "" : singleStateDisplay}
            </tbody>
        )
    }
}

export default SingleCompetition