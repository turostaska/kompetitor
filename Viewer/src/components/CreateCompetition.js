import React, {Component} from 'react';
import SingleCompetition from "./singleElements/SingleCompetition";
import StagePlayOff from "./singleElements/StagePlayOff";
import SingleReferee from "./singleElements/functionComponents/SingleReferee";

class CreateCompetition extends  Component {
    constructor() {
        super();
        this.state = {
            competitorLimit: 0,
            startDate: Date.now(),
            type: "",
            stages: [],
            stageAdded: false,
            stageInProgress: false,
            referees: [],
            addStage: this.addStage,
            currentReferee: "",
            stageType: "PLAYOFF"
        }
    }

    onCompetitorLimitChange = e => {
        this.setState({competitorLimit: e.target.value});
    }
    onDateChange = e => {
        this.setState({startDate: e.target.value})
    }
    onRefereeChange = e => {
        this.setState({currentReferee: e.target.value})
    }
    typeIndividual = e => {
        this.setState({type: "INDIVIDUAL"})
    }
    typeTeam = e => {
        this.setState({type: "TEAM"})
    }
    creatable = () => {
        return this.state.stageAdded === true && this.state.referees.length > 0 &&
            (this.state.type === "INDIVIDUAL" || this.state.type === "GROUP") &&
            this.state.competitorLimit >= 2;
    }
    stageAdding = async() => {
        this.setState({stageInProgress: true});
    }
    addStage = (stage) => {

}
    onAddReferee = async() => {
        await this.setState({referees: [...this.state.referees, this.state.currentReferee]});
    }
    onCreateCompetition = () =>{
        if(this.creatable());
}
    typePlayoff = () => {
        this.setState({stageType: "PLAY_OFF"})
    }
    typeGroup = () => {
        this.setState({stageType: "GROUP"})
    }
    typeFreeForAll = () => {
        this.setState({stageType: "FREE_FOR_ALL"})
    }
    typeLeague = () => {
        this.setState({stageType: "LEAGUE"})
    }

    render(){
        let stageAddDisplay = () => {
            return(
                <StagePlayOff add={this.state.addStage} />
            );
        };
        let singleRefereeDisplay = this.state.referees.map((ref) => {
            return( <SingleReferee referee={ref}/> );
        });
        return(
            <div>
            <h1>Create a Competition</h1>
                <div>
                    <label id='competititor_limit'>Player limit: </label>
                    <input type='number' id="competitorLimit" min="2" value={this.state.competitorLimit} onChange={this.onCompetitorLimitChange}/>
                    <br/>
                    <label id='start_date'>Starting Date: </label>
                    <input type="date" id="start" name="trip-start" value={"2021-12-01"} min="1970-01-01" max="2099-12-31" onChange={this.onDateChange}/>
                    <br/>
                    <label id='competition_type'>Type: </label>
                    <input type="radio" id="individual" name="competition_type" onClick={this.typeIndividual}/>
                    <label htmlFor="individual">Individual</label>
                    <br/>
                    <input type="radio" id="team" name="competition_type" onClick={this.typeTeam}/>
                    <label htmlFor="team">Team</label>
                    <br/>
                    <div>
                    <label>Stages: </label>
                        <label id='stage_type'>Stage type: </label>
                        <br/>
                        <input type="radio" id="Play off" name="stage_type" onClick={this.typePlayoff}/>
                        <label htmlFor="individual">Play off</label>
                        <br/>
                        <input type="radio" id="group" name="stage_type" onClick={this.typeGroup}/>
                        <label htmlFor="team">Group stage</label>
                        <br/>
                        <input type="radio" id="free_for_all" name="stage_type" onClick={this.typeFreeForAll}/>
                        <label htmlFor="team">Free for all</label>
                        <br/>
                        <input type="radio" id="league" name="stage_type" onClick={this.typeLeague}/>
                        <label htmlFor="team">League stage</label>
                        <br/>
                    <button disabled={!this.state.stageInProgress} onClick={this.stageAdding}>Add Stage</button>
                    {this.state.stageInProgress === false ? "" : stageAddDisplay()}
                    </div>
                    <div>
                    <label>Add referees by their username: </label>
                    <input type="text" id="username" value={this.state.currentReferee} onChange={this.onRefereeChange}/>
                    <button onClick={this.onAddReferee}>Add Referee</button>
                    </div>
                    <select value="Referees">
                        <option>Referees</option>
                        {this.state.referees.length === 0 ? <option>"No referees"</option> : singleRefereeDisplay}
                    </select>
                    <br/>
                    <button onClick={this.onCreateCompetition} >Create Competition </button>
                </div>
            </div>
        )
    }



}

export default CreateCompetition;