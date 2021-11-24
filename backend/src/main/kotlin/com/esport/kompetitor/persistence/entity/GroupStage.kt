package com.esport.kompetitor.persistence.entity

import org.hibernate.validator.constraints.Range
import javax.persistence.Entity

@Entity
class GroupStage (
    competition: Competition,
    competitorsIn: Int,
    competitorsOut: Int,
    numLegs: Int,

    @Range(min = 2, max = 16)
    val numTeamsPerGroup: Int,

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
        require(competitorsOut % numTeamsPerGroup == 0)
    }
}