package com.esport.kompetitor.persistence.entity

import com.esport.kompetitor.util.cartesianProductWithSelf
import com.esport.kompetitor.util.ceilDivide
import org.hibernate.validator.constraints.Range
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.OneToMany

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

    @OneToMany(cascade = [CascadeType.ALL], orphanRemoval = true)
    var groups: List<Group> = listOf()

    override fun draw() {
        val numGroup: Int = ceilDivide(competition.competitors.size, numTeamsPerGroup)
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
                        pointsInGroup.merge(comp1, pointsForWin, Int::plus)
                        pointsInGroup.merge(comp2, pointsForLoss, Int::plus)
                    }
                    match.scores[comp2]!! > match.scores[comp1]!! -> {
                        pointsInGroup.merge(comp2, pointsForWin, Int::plus)
                        pointsInGroup.merge(comp1, pointsForLoss, Int::plus)
                    }
                    else -> {
                        pointsInGroup.merge(comp2, pointsForTie, Int::plus)
                        pointsInGroup.merge(comp1, pointsForTie, Int::plus)
                    }
                }
            }
            pointsForEachGroup += pointsInGroup
        }
        return pointsForEachGroup
    }
}