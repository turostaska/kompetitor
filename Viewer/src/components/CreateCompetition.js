import React, {Component} from 'react';
import SingleCompetition from "./singleElements/SingleCompetition";
import StagePlayOff from "./singleElements/StagePlayOff";
import SingleReferee from "./singleElements/functionComponents/SingleReferee";
import SingleStageFunction from "./singleElements/functionComponents/SingleStageFunction";
import StageGroup from "./singleElements/StageGroup";
import CompetitorViewDTO from "../DTOs/CompetitorViewDTO";
import CompetitionDTO from "../DTOs/CompetitionDTO";
import NewCompetitionService from "../services/CompetitionService";
import StageFreeForAll from "./singleElements/StageFreeForAll";
import StageLeague from "./singleElements/StageLeague";

class CreateCompetition extends  Component {
    constructor() {
        super();
        this.state = {
            competitorLimit: 0,
            startDate: new Date().toISOString(),
            type: "",
            stages: [],
            stageAdded: false,
            stageInProgress: false,
            referees: [],
            addStage: this.addStage,
            currentReferee: "",
            stageType: "PLAY_OFF",
            competitionAdded: false,
            file: {},
            fileAdded: false
        }
    }


    onCompetitorLimitChange = e => {
        this.setState({competitorLimit: Number(e.target.value)});
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
    typePlayoff = () => {
        this.setState({stageType: "PLAY_OFF"})
    }
    typeGroup = () => {
        this.setState({stageType: "GROUP"})
    }
    typeFreeForAll = () => {
        this.setState({stageType: "FREE_FOR_ALL"})
    }
    onFileChange = async(e) => {
        await this.setState({file: e.target.files[0], fileAdded: true})
    }
    typeLeague = () => {
        this.setState({stageType: "LEAGUE"})
    }
    onAddReferee = async() => {
        await this.setState({referees: [...this.state.referees, {username: this.state.currentReferee, password: 123}]});
    }

    creatable = () => {
        return this.state.stageAdded === true && this.state.referees.length > 0 &&
            (this.state.type === "INDIVIDUAL" || this.state.type === "TEAM") &&
            this.state.competitorLimit >= 2;
    }
    stageAdding = async() => {
        this.setState({stageInProgress: true});
    }
    addStage = async(stage) => {
        await this.setState({stages: [...this.state.stages, stage], stageInProgress: false, stageAdded:true});
}

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    onCreateCompetition = async() =>{

        if(this.creatable()){
            let date= this.state.startDate+":00.00Z";
            let competition = new CompetitionDTO(this.state.competitorLimit, date, this.state.type, this.state.stages);
            NewCompetitionService.postNewCompetitions(this.props.token, competition).then( async(result) => {
                if(result.status === 200){
                    let id = result.data.id;
                    for(let i=0; i<this.state.referees.length; i++){
                        await NewCompetitionService.postNewReferee(this.props.token, id, this.state.referees[i].username);
                    }
                    if(!(this.state.file === {})){


                        const base64File = await this.toBase64(this.state.file).catch(e => Error(e));
                        if(result instanceof Error) {
                            console.log('Error: ', result.message);
                            alert("base64 error")
                            return;
                        }
                        if(this.state.fileAdded)
                            NewCompetitionService.postCss(this.props.token, id, base64File).then(result => {
                                if(!(result.status === 200))
                                    alert("problem with upload");
                            })
                    }
                    await this.setState({competitorLimit: 0, startDate: Date.now(), type: "",
                        stages: [], stageAdded: false, stageInProgress: false, referees: [],
                        addStage: this.addStage, currentReferee: "", stageType: "PLAY_OFF", competitionAdded: true, file: {}, fileAdded: false})
                }
                else
                    alert("not successful creation");
            })
        }
}


    render(){
        let stageAddDisplay = () => {
            switch (this.state.stageType)
            {
                case "PLAY_OFF":
                    return(
                        <StagePlayOff add={this.state.addStage} />
                    );
                case "GROUP":
                    return(
                        <StageGroup add={this.state.addStage} />
                    );
                case "FREE_FOR_ALL":
                    return(
                        <StageFreeForAll add={this.state.addStage} />
                    );
                case "LEAGUE":
                    return(
                        <StageLeague add={this.state.addStage} />
                    );
            }

        };
        let stageListDisplay = this.state.stages.map((s) => {
            return (<table className="table table-striped">
                <thead>
                <tr>
                    <td>CompetitorsIn</td>
                    <td>CompetitorsOut</td>
                    <td>Number of legs</td>
                    <td>Competitor number per match</td>
                    <td>Competitor number per group</td>
                    <td>Points for win</td>
                    <td>Points for tie</td>
                    <td>Points for loss</td>
                </tr>
                </thead>
                <tbody>
                <SingleStageFunction stage={s}/>
                </tbody>
            </table>);
        })
        let singleRefereeDisplay = this.state.referees.map((ref) => {
            return( <SingleReferee referee={ref}/> );
        });
        return(
            <div>
            <h1>Create a Competition</h1>
                {this.state.competitionAdded===false ? "" : <h2>Competition added, add another?</h2> }
                <div>
                    <label id='competititor_limit'>Player limit: </label>
                    <input type='number' id="competitorLimit" min="2" value={this.state.competitorLimit} onChange={this.onCompetitorLimitChange}/>
                    <br/>
                    <label id='start_date'>Starting Date: </label>
                    <input type="datetime-local" id="meeting-time" name="meeting-time"
                           value={this.state.startDate} min="1970-01-01T00:01" max="2100-06-14T00:00" onChange={this.onDateChange}/>
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
                        <br/>
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
                    <button disabled={this.state.stageInProgress} onClick={this.stageAdding}>Add Stage</button>
                    {this.state.stageInProgress === false ? "" : stageAddDisplay()}
                    {this.state.stages.length === 0 ? "" : stageListDisplay}
                    </div>

                    <div>
                    <label>Add referees by their username: </label>
                    <input type="text" id="username" value={this.state.currentReferee} onChange={this.onRefereeChange}/>
                    <button onClick={this.onAddReferee}>Add Referee</button>
                    </div>
                    <div>
                        <label>Add a CSS file, that describes how the view of the competition should look</label>
                        <input type="file" id="myfile" name="myfile" onChange={this.onFileChange}/>
                    </div>
                    <select value="Referees">
                        <option>Referees</option>
                        {this.state.referees.length === 0 ? <option>"No referees"</option> : singleRefereeDisplay}
                    </select>
                    <br/>
                    <button disabled={!this.creatable()} onClick={this.onCreateCompetition} >Create Competition </button>
                </div>
            </div>
        )
    }



}

export default CreateCompetition;