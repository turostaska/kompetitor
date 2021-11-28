import Rect, {Component} from 'react';
import ScoreDTO from "../../DTOs/ScoreDTO";
import SingleScore from "./functionComponents/SingleScore";

class SingleMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: []
        }
        this.getScoresOut();
    }
    getScoresOut = () => {
        var obj = this.props.match.scores;
        Object.keys(obj).forEach(function (key) {
            let name = "";
            let nameHelper1 = key.split("name");
            if(nameHelper1.length > 2){
                let nameHelper2 = nameHelper1[1].split("=")[2];
                name += nameHelper2
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
            let score = obj[key];
            this.state.scores.push(new ScoreDTO(name, score));
        });
    }

    render(){
        let SingleScoreDisplay = this.state.scores.map((s) => {
            return (
                <SingleScore score={s} placeholder={this.props.match.id} />
            );
        });
        return(
            <tr>
                <td> </td>
                <td>
                    <table>
                        <thead>
                            <tr>
                                <td>Order</td>
                                <td>Competitor</td>
                                <td>Score</td>
                            </tr>
                        </thead>
                        <tbody>
                        {SingleScoreDisplay}
                        </tbody>
                    </table>
                </td>
            </tr>

        )
    }
}
export default SingleMatch