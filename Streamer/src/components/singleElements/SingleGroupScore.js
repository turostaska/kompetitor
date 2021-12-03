import React, {Component} from "react";
import SingleMatch from "./SingleMatch";
import competitionService from "../../services/CompetitionService";


class SingleGroupScore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            group: this.props.group,
            competition: this.props.competition,
            points: [],
            css: false,
            cssMapping: false,
        }
        this.getCss()
        this.getPoints().then()
    }

    getCss = () => {
        competitionService.getCssForCompetition(this.state.competition, this.props.token).then(async result => {
                if (result.status === 200) {
                    let cssBase64 = result.data
                    let css = atob(cssBase64)

                    await this.setState({css: css})
                    await this.cssString(css)
                }
            }
        ).catch( error => {
            alert(error.message)
            this.setState({css: false})
        }
        )
    }

    getPoints = async () => {
        this.state.points = []

        let group = this.state.group

        let players = Object.keys(group.scores)

        for (let i = 0; i < players.length; ++i) {
            let player = players[i]
            this.state.points.push([player, group.scores[player]])
        }

        this.state.points.sort(function (first, second) { return second[1] - first[1] })
    }

    playerName = (key) => {
        let nameParts = key.slice(0, -1).split(", ").map(it => it.split('=')[1])
        return nameParts[1]
    }

    cssString = (str) => {
        let parts = str.split("}")

        let rules = {}
        for (let i = 0; i < parts.length; i++) {
            let cssText = parts[i]
            var cssTxt = cssText.replace(/\/\*(.|\s)*?\*\//g, " ").replace(/\s+/g, " ");
            let name = cssText.split("{")[0].replace(/\s/g, "")

            var style = {}, [,ruleName,rule] = cssTxt.match(/ ?(.*?) ?{([^}]*)}/)||[,,cssTxt];
            // var cssToJs = s => s.replace(/\W+\w/g, match => match.slice(-1).toUpperCase());
            var properties = rule.split(";").map(o => o.split(":").map(x => x && x.trim()));
            for (var [property, value] of properties) {
                property = property.replace(/\s+/g, "")
                if (property.includes("{"))
                    property = property.split("{")[1]
                // property = property.replace(/\s+/g, "").replace(" ", "")
                style[property] = value;
            }


            rules[name] = {ruleName, ...style}
        }

        this.setState({cssMapping: rules})
    }

    render() {
        let points = this.state.points.map((score) => {
            if (score === undefined)
                return <tr>Üres</tr>
            return <tr >
                <td style={this.state.cssMapping[".playerName"]} >{this.playerName(score[0])}</td>
                <td style={this.state.cssMapping[".score"]} >{score[1]}</td>
            </tr>
        })

        return(
            <table className="table-striped table " >
                <thead>
                <tr >
                    <td style={this.state.cssMapping[".head"]} >Player</td>
                    <td style={this.state.cssMapping[".head"]} >Score</td>
                </tr>
                </thead>
                { points}
            </table>
        );
    }
}
export default SingleGroupScore