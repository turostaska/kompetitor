import React, {Component} from 'react'
import StageViewDTO from "../../DTOs/StageViewDTO";

class StageFreeForAll extends Component {
    constructor(props) {
        super();
        this.state={
            competitorsIn: 0,
            competitorsOut: 0,
            numOfLegs: 0,
            numCompetitorsPerMatch: 0
        }
    }

    onCreateStage = () => {
        if(this.state.competitorsIn > 1 && this.state.competitorsOut >0 && this.state.numOfLegs >0 && this.state.numCompetitorsPerMatch > 0 ) {
            let stage = new StageViewDTO("FREE_FOR_ALL", this.state.competitorsIn, this.state.competitorsOut, "", this.state.numOfLegs,
                this.state.numCompetitorsPerMatch, "", "", "");
            this.props.add(stage);
        }
    }

    onCompetitorsInChange = async(e) => {
        await this.setState({competitorsIn: e.target.value})
    }
    onCompetitorsOutChange = async(e) => {
        await this.setState({competitorsOut: e.target.value})
    }
    onNumOfLegsChange = e => {
        this.setState({numOfLegs: e.target.value})
    }
    onCompetitorsPerMatchChange = e => {
        this.setState({numCompetitorsPerMatch: e.target.value})
    }

    render() {
        return (
            <div>
                <label id='competititors_in'>Number of competitors entering this stage: </label>
                <input type='number' id="competitorsOut" min="2" value={this.state.competitorsIn} onChange={this.onCompetitorsInChange}/>
                <br/>
                <label id='competititors_out'>Number of competitors leaving this stage: </label>
                <input type='number' id="competitorsOut" min="2" value={this.state.competitorsOut} onChange={this.onCompetitorsOutChange}/>
                <br/>
                <label id='num_legs'>Number of legs: </label>
                <input type='number' id="numLegs" min="2" value={this.state.numOfLegs} onChange={this.onNumOfLegsChange}/>
                <br/>
                <label id='competitors_per_match'>Competitors per match: </label>
                <input type='number' id="numLegs" min="2" value={this.state.numCompetitorsPerMatch} onChange={this.onCompetitorsPerMatchChange}/>
                <br/>
                <button onClick={this.onCreateStage}>Create Stage</button>
            </div>
        );
    }


}
export default StageFreeForAll