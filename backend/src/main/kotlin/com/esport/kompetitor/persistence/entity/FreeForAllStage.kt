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

    override fun draw() {
        repeat(numLegs) {
            matches += Match(
                stage = this,
                competitors = competition.competitors.toMutableList()
            )
        }
    }

    override fun pointsForEachGroup(): List<Map<Competitor, Int>> {
        val points = mutableMapOf<Competitor, Int>()

        matches.forEach { match ->
            val competitorsOrdered = competition.competitors.sortedBy { match.scores[it] }

            competitorsOrdered.forEachIndexed { index, it ->
                points.merge(it, index, Int::plus)
            }
        }

        return listOf(points)
    }

    override fun advancingCompetitors(): Set<Competitor> {
        require(concluded) { "There can be no advancing competitors from a stage that is yet to conclude." }

        val pointsDescending = pointsForEachGroup()[0].toList().sortedByDescending { it.second }

        return pointsDescending.take(numCompetitorsOut).map { it.first }.toSet()
    }
}