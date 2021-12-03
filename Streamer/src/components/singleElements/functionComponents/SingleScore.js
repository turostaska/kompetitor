import React from 'react';

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
                <td id={"playerName1"}>{this.playerName(1)}</td>
                <td contentEditable={this.state.editMode} id={"score1"}
                    className={this.state.match.concluded ? "concluded" : "ongoing"}>
                    {this.state.player1.score}
                </td>
                <td/>
                <td contentEditable={this.state.editMode} id={"score2"}
                    className={this.state.match.concluded ? "concluded" : "ongoing"}>
                    {this.state.player2.score}
                </td>
                <td id={"playerName2"}>{this.playerName(2)}</td>

            </tr>
        );
    }
}

export default SingleScore