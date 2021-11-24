package com.esport.kompetitor.persistence.entity

import javax.persistence.Entity

@Entity
class LeagueStage (
    competition: Competition,
    competitorsIn: Int,
    competitorsOut: Int,
    numLegs: Int,

    val pointsForWin: Int,
    val pointsForTie: Int,
    val pointsForLoss: Int,
): Stage(
    competition = competition,
    numCompetitorsIn = competitorsIn,
    numCompetitorsOut = competitorsOut,
    numCompetitorsPerMatch = 2,
    numLegs = numLegs,
) {
    init {
        require(numCompetitorsIn > numCompetitorsOut)
    }
}


