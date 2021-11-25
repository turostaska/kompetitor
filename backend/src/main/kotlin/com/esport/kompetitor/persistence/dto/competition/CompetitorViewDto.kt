package com.esport.kompetitor.persistence.dto.competition

import com.esport.kompetitor.persistence.entity.Competition
import com.esport.kompetitor.persistence.entity.Competitor
import com.esport.kompetitor.persistence.entity.Team
import com.esport.kompetitor.persistence.entity.User

data class CompetitorViewDto(
    val id: Long,
    val name: String,
    val type: Competition.Companion.Type,
) {
    companion object {
        private fun fromUser(user: User): CompetitorViewDto = CompetitorViewDto(
            id = user.id,
            name = user.username,
            type = Competition.Companion.Type.INDIVIDUAL
        )

        private fun fromTeam(team: Team): CompetitorViewDto = CompetitorViewDto(
            id = team.id,
            name = team.name,
            type = Competition.Companion.Type.TEAM
        )

        fun fromCompetitor(c: Competitor) = when(c) {
            is User -> fromUser(c)
            is Team -> fromTeam(c)
            else -> throw IllegalArgumentException("Unknown type: ${c.javaClass}")
        }
    }
}
