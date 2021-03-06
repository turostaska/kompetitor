import {Component} from 'react';
import ScoreDTO from "../../DTOs/ScoreDTO";
import SingleScore from "./functionComponents/SingleScore";

class SingleMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: []
        }
        this.getScoresOut().then();
    }
    getScoresOut = async() => {
        let helper1 = this.props.match.scores;
        var listHelp = [];
        for (var prop in helper1) {
            if (Object.prototype.hasOwnProperty.call(helper1, prop)) {
                listHelp.push(await this.cleanScore(prop, helper1));
                console.log(this.cleanScore(prop, helper1));
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
        return new ScoreDTO(name, obj[key]);

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
        let SingleScoreDisplay = this.state.scores.map((s) => {
            console.log(s);
            return (
                <SingleScore score={s} placeholder={this.props.match} />
            );
        });
        return(
            <tr>
                <td>{this.props.placeholder.id}. stage</td>
                <td>{this.props.placeholder.type}</td>
                <td>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td>Order</td>
                                <td>Competitor</td>
                                <td>Score</td>
                                <td>Is Concluded</td>
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