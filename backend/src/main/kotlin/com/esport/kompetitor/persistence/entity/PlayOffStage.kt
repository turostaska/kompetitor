package com.esport.kompetitor.persistence.entity

import com.esport.kompetitor.util.cartesianProductWithSelf
import com.esport.kompetitor.util.ceilDivide
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

    override fun draw() {
        val numGroup: Int = ceilDivide(competition.competitors.size, 2)
        val groups = Array<MutableSet<Competitor>>(numGroup) { mutableSetOf() }

        competition.competitors.shuffled().forEachIndexed { i, competitor ->
            groups[i % numGroup] += competitor
        }

        this.groups.clear()
        this.groups.addAll(groups.map { Group(it, this) })

        for (group in this.groups) {
            group.competitors.cartesianProductWithSelf().forEach { (competitor, opponent) ->
                repeat(numLegs) {
                    matches += Match(
                        stage = this,
                        competitors = mutableListOf(competitor, opponent),
                        group = group
                    ).also { group.groupMatches.add(it) }
                }
            }
        }
    }

    override fun pointsForEachGroup(): List<Map<Competitor, Int>> {
        val pointsForEachGroup = mutableListOf<Map<Competitor, Int>>()

        for (group in groups) {
            val pointsInGroup = mutableMapOf<Competitor, Int>()

            for (match in group.groupMatches) {
                val comp1 = match.competitors[0]
                val comp2 = match.competitors[1]

                when {
                    match.scores[comp1]!! > match.scores[comp2]!! -> {
                        pointsInGroup.merge(comp1, 1, Int::plus)
                        pointsInGroup.merge(comp2, 0, Int::plus)
                    }
                    match.scores[comp2]!! > match.scores[comp1]!! -> {
                        pointsInGroup.merge(comp2, 1, Int::plus)
                        pointsInGroup.merge(comp1, 0, Int::plus)
                    }
                    else -> {
                        pointsInGroup.merge(comp2, 0, Int::plus)
                        pointsInGroup.merge(comp1, 0, Int::plus)
                    }
                }
            }
            group.scores.clear()
            group.scores.putAll(pointsInGroup)

            pointsForEachGroup += pointsInGroup
        }
        return pointsForEachGroup
    }

    override fun advancingCompetitors(): Set<Competitor> {
        require(concluded) { "There can be no advancing competitors from a stage that is yet to conclude." }

        val advancing = mutableSetOf<Competitor>()
        pointsForEachGroup().forEach { group ->
            advancing += group.toList().maxByOrNull { it.second }!!.first
        }

        assert(advancing.size <= numCompetitorsOut)
        return advancing
    }
}