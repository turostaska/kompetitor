package com.esport.kompetitor.persistence.entity

import com.esport.kompetitor.util.cartesianProductWithSelf
import com.esport.kompetitor.util.ceilDivide
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.OneToMany

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

    @OneToMany(cascade = [CascadeType.ALL], orphanRemoval = true)
    var groups: List<Group> = listOf()

    override fun draw() {
        val numGroup: Int = ceilDivide(competition.competitors.size, 2)
        val groups = Array<MutableSet<Competitor>>(numGroup) { mutableSetOf() }

        competition.competitors.shuffled().forEachIndexed { i, competitor ->
            groups[i % numGroup] += competitor
        }

        this.groups = groups.map { Group(it) }

        for (group in this.groups) {
            group.competitors.cartesianProductWithSelf().forEach { (competitor, opponent) ->
                repeat(numLegs) {
                    matches += Match(
                        stage = this,
                        competitors = mutableListOf(competitor, opponent)
                    ).also { group.matches.add(it) }
                }
            }
        }
    }

    override fun pointsForEachGroup(): List<Map<Competitor, Int>> {
        val pointsForEachGroup = mutableListOf<Map<Competitor, Int>>()

        for (group in groups) {
            val pointsInGroup = mutableMapOf<Competitor, Int>()

            for (match in group.matches) {
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
            pointsForEachGroup += pointsInGroup
        }
        return pointsForEachGroup
    }
}