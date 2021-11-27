package com.esport.kompetitor.persistence.entity

import com.esport.kompetitor.util.cartesianProductWithSelf
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

    override fun draw() {
        competition.competitors.cartesianProductWithSelf().forEach { (competitor, opponent) ->
            repeat(numLegs) {
                matches += Match(
                    stage = this,
                    competitors = mutableListOf(competitor, opponent)
                )
            }
        }
    }

    override fun pointsForEachGroup(): List<Map<Competitor, Int>> {
        val points = mutableMapOf<Competitor, Int>()

        matches.forEach { match ->
            val competitors = match.scores.keys.toList().onEach { points.putIfAbsent(it, 0) }

            when {
                match.scores[competitors[0]]!! > match.scores[competitors[1]]!! -> {
                    points[competitors[0]] = points[competitors[0]]!! + pointsForWin
                    points[competitors[1]] = points[competitors[1]]!! + pointsForLoss
                }
                match.scores[competitors[1]]!! > match.scores[competitors[0]]!! -> {
                    points[competitors[0]] = points[competitors[0]]!! + pointsForLoss
                    points[competitors[1]] = points[competitors[1]]!! + pointsForWin
                }
                else -> { // tie
                    points[competitors[0]] = points[competitors[0]]!! + pointsForTie
                    points[competitors[1]] = points[competitors[1]]!! + pointsForTie
                }
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


