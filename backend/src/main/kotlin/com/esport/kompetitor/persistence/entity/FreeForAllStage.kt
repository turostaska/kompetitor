package com.esport.kompetitor.persistence.entity

import javax.persistence.Entity

@Entity
class FreeForAllStage (
    competition: Competition,
    competitorsIn: Int,
    competitorsOut: Int,
    numCompetitorsPerMatch: Int,
    numLegs: Int,
): Stage(
    competition = competition,
    numCompetitorsIn = competitorsIn,
    numCompetitorsOut = competitorsOut,
    numCompetitorsPerMatch = numCompetitorsPerMatch,
    numLegs = numLegs,
) {
    init {
        require(numCompetitorsIn > numCompetitorsOut)
    }
}