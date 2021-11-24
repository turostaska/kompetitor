package com.esport.kompetitor.persistence.dto.competition

import com.esport.kompetitor.persistence.entity.Competition
import com.esport.kompetitor.persistence.entity.Match
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.KeyDeserializer
import com.fasterxml.jackson.databind.annotation.JsonDeserialize

class CompetitorDeserializer: KeyDeserializer() {
    override fun deserializeKey(key: String, ctx: DeserializationContext): CompetitorViewDto {
        val parts = key.removeSuffix(")").split(", ").map {
            it.split("=")[1]
        }.toTypedArray()

        return CompetitorViewDto(
            id = parts[0].toLong(),
            name = parts[1],
            type = Competition.Companion.Type.valueOf(parts[2])
        )
    }
}

data class MatchViewDto(
    val id: Long,

    @JsonDeserialize(keyUsing = CompetitorDeserializer::class)
    val scores: Map<CompetitorViewDto, Int>,

    val concluded: Boolean,
) {
    companion object {
        fun fromMatch(match: Match) = MatchViewDto(
            match.id,
            match.scores.entries.associate { CompetitorViewDto.fromCompetitor(it.key) to it.value },
            match.concluded
        )
    }
}