package com.esport.kompetitor.persistence.dto.competition

import com.esport.kompetitor.persistence.entity.Group

data class GroupViewDto(
    val competitors: Set<CompetitorViewDto>,
) {
    companion object {
        fun fromGroup(group: Group): GroupViewDto =
            GroupViewDto(competitors = group.competitors.map { CompetitorViewDto.fromCompetitor(it) }.toSet())
    }
}
