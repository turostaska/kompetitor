package com.esport.kompetitor.persistence.dto.competition

import com.esport.kompetitor.persistence.dto.auth.UserViewDto
import com.esport.kompetitor.persistence.entity.Competition
import java.time.LocalDateTime

data class CompetitionViewDto (
    val id: Long? = null,
    val admin: UserViewDto? = null,
    val competitorLimit: Int,
    val startDate: LocalDateTime,
    val type: Competition.Companion.Type,
    val competitors: Set<CompetitorViewDto> = setOf(),
    val referees: Set<UserViewDto>? = setOf(),
    val stages: List<StageViewDto>? = listOf(),
    val currentStage: Int,
) {
    companion object {
        fun fromCompetition(competition: Competition) = competition.run {
            CompetitionViewDto(
                id,
                UserViewDto.fromUser(admin),
                competitorLimit,
                startDate,
                type,
                competitors.map { CompetitorViewDto.fromCompetitor(it) }.toSet(),
                referees.map { UserViewDto.fromUser(it) }.toSet(),
                stages.map { StageViewDto.fromStage(it) },
                currentStage
            )
        }
    }
}