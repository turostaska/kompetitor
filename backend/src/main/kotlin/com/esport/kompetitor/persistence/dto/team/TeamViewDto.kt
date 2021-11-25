package com.esport.kompetitor.persistence.dto.team

import com.esport.kompetitor.persistence.dto.auth.UserViewDto
import com.esport.kompetitor.persistence.entity.Team

data class TeamViewDto(
    val id: Long,
    val name: String,
    val members: List<UserViewDto>,
) {
    companion object {
        fun fromTeam(team: Team) = TeamViewDto(
            team.id,
            team.name,
            team.members.map { UserViewDto.fromUser(it) }
        )
    }
}
