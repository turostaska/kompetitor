package com.esport.kompetitor.persistence.service

import com.esport.kompetitor.persistence.dto.competition.CompetitionViewDto
import com.esport.kompetitor.persistence.entity.Competition
import com.esport.kompetitor.persistence.repository.CompetitionRepository
import com.esport.kompetitor.persistence.repository.UserRepository
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Component

@Component
class CompetitionService(
    private val competitionRepository: CompetitionRepository,
    private val userRepository: UserRepository,
) {
    fun findAll(): List<CompetitionViewDto> =
        competitionRepository.findAll().map { CompetitionViewDto.fromCompetition(it) }

    fun create(adminId: Long, competitionView: CompetitionViewDto): CompetitionViewDto {
        val admin = userRepository.readById(adminId) ?:
            throw UsernameNotFoundException("User with id $adminId does not exist.")

        val competition = Competition(admin = admin,
            competitorLimit = competitionView.competitorLimit,
            startDate = competitionView.startDate,
            type = competitionView.type
        ).apply { stages.addAll(competitionView.stages.map { it.toStage(this) }) }

        return competitionRepository.save(competition).let {
            CompetitionViewDto.fromCompetition(it)
        }
    }
}