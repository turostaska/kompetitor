package com.esport.kompetitor.persistence.service

import com.esport.kompetitor.persistence.dto.competition.*
import com.esport.kompetitor.persistence.entity.Competition
import com.esport.kompetitor.persistence.entity.Competition.Companion.Type.TEAM
import com.esport.kompetitor.persistence.repository.CompetitionRepository
import com.esport.kompetitor.persistence.repository.MatchRepository
import com.esport.kompetitor.persistence.repository.UserRepository
import org.springframework.stereotype.Component

class CompetitionFailureException(
    message: String,
): RuntimeException(message)

private fun Competition.currentStage() = this.stages[currentStage]
private fun Competition.previousStage() = this.stages[currentStage - 1]

@Component
class CompetitionService(
    private val competitionRepository: CompetitionRepository,
    private val matchRepository: MatchRepository,
    private val userRepository: UserRepository,
) {
    private fun userById(id: Long) = userRepository.readById(id) ?:
        throw CompetitionFailureException("User with id $id does not exist.")

    private fun userByName(name: String) = userRepository.findByUsername(name) ?:
        throw CompetitionFailureException("User with name $name does not exist.")

    fun competitionById(id: Long) = competitionRepository.readById(id) ?:
        throw CompetitionFailureException("Competition with id $id does not exist.")

    private fun matchById(id: Long) = matchRepository.readById(id) ?:
        throw CompetitionFailureException("Match with id $id does not exist.")

    fun findAll(): List<CompetitionViewDto> =
        competitionRepository.findAll().map { CompetitionViewDto.fromCompetition(it) }

    fun create(adminId: Long, competitionView: CompetitionViewDto): CompetitionViewDto {
        val admin = userById(adminId)

        val competition = Competition(admin = admin,
            competitorLimit = competitionView.competitorLimit,
            startDate = competitionView.startDate,
            type = competitionView.type
        ).apply { stages.addAll(competitionView.stages!!.map { it.toStage(this) }) }

        return competitionRepository.save(competition).let { CompetitionViewDto.fromCompetition(it) }
    }

    fun addReferee(adminId: Long, competitionId: Long, refereeName: String): CompetitionViewDto {
        val admin = userById(adminId)

        val competition = competitionById(competitionId).also {
            require(it.admin == admin)
        }

        val referee = userByName(refereeName).also {
            require(it !in competition.competitors)
        }

        competition.referees += referee
        return competitionRepository.save(competition).let { CompetitionViewDto.fromCompetition(it) }
    }

    fun joinCompetition(userId: Long, competitionId: Long): CompetitionViewDto {
        val user = userById(userId)

        val competition = competitionById(competitionId).also {
            require(it.competitors.size < it.competitorLimit) { "The competition is full." }
            require(user !in it.referees) { "Referees can't compete." }
            require(it.currentStage == -1) { "The competition has already started." }
            if (it.type == TEAM)
                require(user.team != null) { "Can't join a team competition without having a team." }
        }

        competition.let { it.competitors += if (it.type == TEAM) user.team!! else user }
        return competitionRepository.save(competition).let { CompetitionViewDto.fromCompetition(it) }
    }

    fun updateMatch(refereeId: Long, update: MatchViewDto): MatchViewDto {
        val referee = userById(refereeId)
        val match = matchById(update.id).also {
            require(referee in it.stage.competition.referees)
            require(!it.concluded)
        }

        match.apply {
            concluded = update.concluded
            scores.keys.forEach { scores[it] = update.scores[CompetitorViewDto.fromCompetitor(it)]!! }
        }

        return matchRepository.save(match).run {
            if (concluded && stage.competition.stages.all { it.concluded })
                stage.competition.let {
                    it.concluded = true
                    competitionRepository.save(it)
                }

            MatchViewDto.fromMatch(this)
        }
    }

    fun advanceToNextStage(competitionId: Long, refereeId: Long): StageViewDto {
        val referee = userById(refereeId)
        val competition = competitionById(competitionId).also {
            require(it.currentStage == -1 || it.currentStage().concluded)
            require(referee in it.referees)
            it.currentStage += 1
            require(it.currentStage < it.stages.size)
        }
        val currentStage = competition.currentStage()

        if (competition.currentStage > 0 && currentStage.numCompetitorsIn < competition.competitors.size) {
            // get advancing competitors
            competition.previousStage().let {
                competition.competitors = it.advancingCompetitors().toMutableSet()
            }
        }

        if (currentStage.numCompetitorsOut >= competition.competitors.size) {
            currentStage.concluded = true
            return competitionRepository.save(competition).let { StageViewDto.fromStage(it.currentStage()) }
        }

        currentStage.draw()

        return competitionRepository.save(competition).let { StageViewDto.fromStage(it.currentStage()) }
    }

    fun currentStageIsConcluded(competitionId: Long) = competitionById(competitionId).let {
        it.currentStage < 0 || (it.currentStage < it.stages.size-1 && it.stages[it.currentStage].concluded)
    }

    fun getResults(competitionId: Long): List<StageResultViewDto> {
        val competition = competitionById(competitionId)

        return competition.stages.filter { it.matches.isNotEmpty() }.map { StageResultViewDto.fromStage(it) }.toList()
    }

    fun uploadCss(competitionId: Long, adminId: Long, cssFile: ByteArray): ByteArray {
        val admin = userById(adminId)

        val competition = competitionById(competitionId).also {
            require(it.admin == admin)
            it.cssFile = cssFile
        }

        return competitionRepository.save(competition).cssFile
    }

    fun getCss(competitionId: Long): ByteArray = competitionById(competitionId).cssFile

    fun competitionsRefereedBy(userId: Long) = competitionRepository.findRefereedBy(userId)
}