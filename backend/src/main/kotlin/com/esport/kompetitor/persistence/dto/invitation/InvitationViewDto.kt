package com.esport.kompetitor.persistence.dto.invitation

import com.esport.kompetitor.persistence.dto.team.TeamViewDto
import com.esport.kompetitor.persistence.dto.auth.UserViewDto
import com.esport.kompetitor.persistence.entity.TeamInvitation

data class InvitationViewDto(
    val id: Long,
    val team: TeamViewDto,
    val user: UserViewDto,
) {
    companion object {
        fun fromInvitation(invitation: TeamInvitation) = invitation.let {
            InvitationViewDto(
                id = it.id,
                team = TeamViewDto.fromTeam(it.team),
                user = UserViewDto.fromUser(it.user),
            )
        }
    }
}