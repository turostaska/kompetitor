package com.esport.kompetitor.persistence.dto.competition

import com.esport.kompetitor.persistence.entity.Group
import com.fasterxml.jackson.databind.annotation.JsonDeserialize

data class GroupResultViewDto(
    @JsonDeserialize(keyUsing = CompetitorDeserializer::class)
    val scores: Map<CompetitorViewDto, Int>,
) {
    companion object {
        fun fromGroup(group: Group) = GroupResultViewDto(
            scores = group.scores.mapKeys { CompetitorViewDto.fromCompetitor(it.key) }
        )
    }
}
