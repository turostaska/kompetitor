package com.esport.kompetitor.persistence.service

import com.esport.kompetitor.persistence.dto.InvitationViewDto
import com.esport.kompetitor.persistence.dto.TeamViewDto
import com.esport.kompetitor.persistence.entity.Team
import com.esport.kompetitor.persistence.entity.TeamInvitation
import com.esport.kompetitor.persistence.repository.InvitationRepository
import com.esport.kompetitor.persistence.repository.TeamRepository
import com.esport.kompetitor.persistence.repository.UserRepository
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Component

class TeamCreationFailedException(
    message: String,
): RuntimeException(message)

class InvitationFailedException(
    message: String
): RuntimeException(message)

@Component
class TeamService(
    private val teamRepository: TeamRepository,
    private val userRepository: UserRepository,
    private val invitationRepository: InvitationRepository,
) {
    @Throws(TeamCreationFailedException::class)
    fun create(name: String, creatorId: Long): TeamViewDto {
        if (teamRepository.existsByName(name))
            throw TeamCreationFailedException("Team with name '$name' already exists.")

        val creator = userRepository.readById(creatorId) ?:
            throw TeamCreationFailedException("User with id $creatorId does not exist.")

        if (creator.team != null)
            throw TeamCreationFailedException("User with id $creatorId already has a team.")

        val team = Team(name = name, members = mutableSetOf(creator))
        creator.team = team
        return teamRepository.save(team).run {
            TeamViewDto.fromTeam(this)
        }
    }

    fun findAll(): List<TeamViewDto> = teamRepository.findAll().map { TeamViewDto.fromTeam(it) }

    fun leaveTeam(senderId: Long) {
        userRepository.readById(senderId)?.let {
            val team = it.team ?: return

            it.team = null
            team.members.remove(it)
            team.members.ifEmpty { teamRepository.delete(team) }

            userRepository.save(it)
        } ?: throw UsernameNotFoundException("User with id $senderId does not exist.")
    }

    fun getInvitationsOf(userId: Long): List<InvitationViewDto> =
        userRepository.readById(userId)?.invitations?.map(InvitationViewDto::fromInvitation) ?:
        throw UsernameNotFoundException("User with id $userId does not exist.")

    fun sendInvitation(fromId: Long, toId: Long): InvitationViewDto {
        val from = userRepository.readById(fromId) ?:
            throw InvitationFailedException("Sender with id $fromId does not exist.")
        val to = userRepository.readById(toId) ?:
            throw InvitationFailedException("Receiver with id $toId does not exist.")
        val team = from.team ?: throw InvitationFailedException("Sender has no team.")

        return invitationRepository.save(TeamInvitation(user = to, team = team)).let {
            InvitationViewDto.fromInvitation(it)
        }
    }

    fun acceptInvitation(userId: Long, invitationId: Long): TeamViewDto {
        val user = userRepository.readById(userId) ?:
            throw InvitationFailedException("Sender with id $userId does not exist.")

        if (user.team != null) throw InvitationFailedException("User with id $userId already has a team.")

        val team = invitationRepository.readById(invitationId)?.team
            ?: throw InvitationFailedException("Invitation with id $invitationId not found.")

        user.team = team
        team.members += user

        return teamRepository.save(team).run {
            TeamViewDto.fromTeam(this)
        }
    }
}