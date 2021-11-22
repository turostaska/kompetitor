package com.esport.kompetitor.persistence.dto

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
