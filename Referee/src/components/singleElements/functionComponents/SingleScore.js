import React from 'react';
import MatchViewDto from "../../../DTOs/MatchViewDto";
import refereeService from "../../../services/RefereeService";

class SingleScore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token,
            match: this.props.match,
            editMode: false,
            player1: {},
            player2: {},
        }
        this.setPlayers().then()
    }

    setPlayers = async () => {
        let players = Object.keys(this.props.match.scores)

        this.state.player1.name = players[0]
        this.state.player2.name = players[1]

        this.state.player1.score = this.props.match.scores[this.state.player1.name]
        this.state.player2.score = this.props.match.scores[this.state.player2.name]
    }

    switchToEditMode = async () => {
        await this.setState({editMode: true})
        this.render()
    }

    saveScore = async () => {
        let match = this.props.match
        match.concluded = document.getElementById("concluded").innerText.toLowerCase() === "true"

        this.props.match.scores[this.state.player1.name] =
            parseInt(document.getElementById("score1").innerText)
        this.props.match.scores[this.state.player2.name] =
            parseInt(document.getElementById("score2").innerText)

        this.setState({match: {match}})

        let newMatch = new MatchViewDto(match)

        await refereeService.updateMatch(newMatch, this.state.token)

        await this.setState({editMode: false})
        this.render()
    }

    playerName = (num) => {
        let name = "";
        if (num === 1) {
            name = this.state.player1.name
        } else if (num === 2) {
            name = this.state.player2.name
        }
        let nameParts = name.slice(0, -1).split(", ").map(it => it.split('=')[1])
        return nameParts[1]
    }

    render() {
        return (
            <tr>
                <td>{this.props.placeholder.id}. match</td>
                <td><button disabled={this.props.match.concluded} onClick={
                    async () => {
                        await this.switchToEditMode()
                    }
                }>Edit</button></td>

                <td id={"playerName1"}>{this.playerName(1)}</td>
                <td contentEditable={this.state.editMode} id={"score1"}>{this.state.player1.score}</td>

                <td id={"playerName2"}>{this.playerName(2)}</td>
                <td contentEditable={this.state.editMode} id={"score2"}>{this.state.player2.score}</td>

                <td contentEditable={this.state.editMode} id={"concluded"}>
                    {this.props.placeholder.concluded.toString()}</td>
                <td><button disabled={this.props.match.concluded} onClick={
                    async () => {
                        await this.saveScore()
                    }
                }>Save</button></td>
            </tr>
        );
    }
}

export default SingleScore