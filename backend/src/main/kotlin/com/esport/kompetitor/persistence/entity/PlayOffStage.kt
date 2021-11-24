package com.esport.kompetitor.persistence.entity

import javax.persistence.Entity

@Entity
class PlayOffStage(
    competition: Competition,
    competitorsIn: Int,
    competitorsOut: Int,
    numLegs: Int,
): Stage(
    competition = competition,
    numCompetitorsIn = competitorsIn,
    numCompetitorsOut = competitorsOut,
    numCompetitorsPerMatch = 2,
    numLegs = numLegs,
) {
    init {
        require(numCompetitorsIn > numCompetitorsOut)
        require(numLegs % 2 == 1)
    }
}