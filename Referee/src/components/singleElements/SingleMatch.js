import {Component} from 'react';
import ScoreDto from "../../DTOs/ScoreDto";
import SingleScore from "./functionComponents/SingleScore";

class SingleMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match,
            scores: []
        }
        this.getScoresOut().then();
    }
    getScoresOut = async() => {
        let scores = this.props.match.scores;
        let listHelp = [];
        for (let prop in scores) {
            if (Object.prototype.hasOwnProperty.call(scores, prop)) {
                listHelp.push(await this.cleanScore(prop, scores));
                console.log(this.cleanScore(prop, scores));
            }
        }
        await this.loadScores(listHelp);
    }

    cleanScore = async(key, obj) => {
        let name = "";
        let nameHelper1 = key.split("name");
        if(nameHelper1.length > 2){
            let nameHelper2 = nameHelper1[1].split("=")[2];
            name += nameHelper2;
            for(let i=2; i<nameHelper1.length;i++){
                name+="name";
                if(i === nameHelper1.length-1)
                    name+= nameHelper1[i].split(",")[0];
                else
                    name+=nameHelper1[i];
            }
        }
        else{
            let nameHelper2 = nameHelper1[1].split(",");
            name = nameHelper2[0].split("=")[1];
        }
        return new ScoreDto(name, obj[key]);
    }

    loadScores = async(newScoreList) => {
        for(let i=0; i<newScoreList.length;i++) {
            if(i===0)
                await this.setState({
                    scores: [newScoreList[i]]
                });
            else
                await this.setState( {
                    scores: [...this.state.scores, newScoreList[i]]
                });
        }
    }

    render(){
        // let SingleScoreDisplay = this.state.scores.map((s) => {
        //     console.log(s);
        //     return (
        //         <SingleScore score={s} placeholder={this.props.match} match={this.props.match} token={this.props.token}/>
        //     );
        // });

        let SingleScoreDisplay =
                <SingleScore placeholder={this.props.match} match={this.props.match} token={this.props.token}/>

        return(
            <tr>
                <td>{this.props.placeholder}. stage</td>
                <td>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <td>Order</td>
                            <td>Edit</td>
                            <td>Competitor 1</td>
                            <td>Score 1</td>
                            <td>Competitor 2</td>
                            <td>Score 2</td>
                            <td>Is Concluded</td>
                            <td>Save changes</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.scores.length === 0 ? "" : SingleScoreDisplay}
                        </tbody>
                    </table>
                </td>
            </tr>

        )
    }
}
export default SingleMatch