import React from 'react';

export default class StageViewDTO{
    constructor(id, type, numCompetitorsIn, numCompetitorsOut, numCompetitorsPerMatch, numLegs, matches, numTeamsPerGroup, pointsForWin, pointsForTie, pointsForLoss) {
        this.id = id;
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

    // val matches: Set<MatchViewDto> = setOf()
}