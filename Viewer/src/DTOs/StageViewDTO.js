import React from 'react';

export default class StageViewDTO{
    constructor(type, numCompetitorsIn, numCompetitorsOut, numCompetitorsPerMatch, numLegs, matches, numTeamsPerGroup, pointsForWin, pointsForTie, pointsForLoss) {
        this.type = type;
        this.numCompetitorsIn = numCompetitorsIn;
        this.numCompetitorsOut = numCompetitorsOut;
        this.numCompetitorsPerMatch = numCompetitorsPerMatch;
        this.numLegs = numLegs;
        this.matches = matches;
        this.numTeamsPerGroup = numTeamsPerGroup;
        this.pointsForWin = pointsForWin;
        this.pointsForTie = pointsForTie;
        this.pointsForLoss = pointsForLoss;
    }
    getState(){
        switch (this.type) {
            case "PLAY_OFF":
                return { type: this.type, numCompetitorsIn: this.numCompetitorsIn,
                    numCompetitorsOut: this.numCompetitorsOut, numLegs: this.numLegs}
            case "GROUP":
                return { type: this.type, numCompetitorsIn: this.numCompetitorsIn,
                    numCompetitorsOut: this.numCompetitorsOut, numLegs: this.numLegs,
                    numTeamsPerGroup: this.numTeamsPerGroup, pointsForWin: this.pointsForWin,
                    pointsForTie: this.pointsForTie, pointsForLoss: this.pointsForLoss}
            case "FREE_FOR_ALL":
                return { type: this.type, numCompetitorsIn: this.numCompetitorsIn,
                    numCompetitorsOut: this.numCompetitorsOut, numCompetitorsPerMatch: this.numCompetitorsPerMatch,
                    numLegs: this.numLegs}
            case "LEAGUE":
                return { type: this.type, numCompetitorsIn: this.numCompetitorsIn,
                    numCompetitorsOut: this.numCompetitorsOut, numLegs: this.numLegs,
                    pointsForWin: this.pointsForWin, pointsForTie: this.pointsForTie,
                    pointsForLoss: this.pointsForLoss}
            default:
                alert("problem, wrong stage type");
        }

    }
    // val matches: Set<MatchViewDto> = setOf()
}