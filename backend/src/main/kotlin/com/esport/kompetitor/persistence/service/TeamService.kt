package com.esport.kompetitor.persistence.service

import com.esport.kompetitor.persistence.dto.TeamViewDto
import com.esport.kompetitor.persistence.entity.Team
import com.esport.kompetitor.persistence.repository.TeamRepository
import com.esport.kompetitor.persistence.repository.UserRepository
import org.springframework.stereotype.Component

class TeamCreationFailedException(
    message: String,
) : RuntimeException(message)

@Component
class TeamService(
    private val teamRepository: TeamRepository,
    private val userRepository: UserRepository,
) {
    @Throws(TeamCreationFailedException::class)
    fun create(name: String, creatorId: Long): TeamViewDto {
        if (teamRepository.existsByName(name))
            throw TeamCreationFailedException("Team with name '$name' already exists.")

        val creator = userRepository.readById(creatorId) ?:
            throw TeamCreationFailedException("User with id $creatorId does not exist.")

        if (creator.team != null)
            throw TeamCreationFailedException("User with id $creatorId already has a team.")

        // todo: biztosra menni, hogy ez tényleg elmenti a userbe is a csapatot
        val team = Team(name = name, members = setOf(creator))
        creator.team = team
        return teamRepository.save(team).run {
            TeamViewDto.fromTeam(this)
        }
    }

    fun findAll(): List<TeamViewDto> = teamRepository.findAll().map { TeamViewDto.fromTeam(it) }

    // todo: ezeket prolly token alapján kéne????
    fun sendInvitation() {
        TODO()
    }

    fun acceptInvitation() {
        TODO()
    }

    fun leaveTeam() {
        TODO()
    }

}