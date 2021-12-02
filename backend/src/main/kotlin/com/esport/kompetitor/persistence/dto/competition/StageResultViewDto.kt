package com.esport.kompetitor.persistence.dto.competition

import com.esport.kompetitor.persistence.dto.competition.StageViewDto.Companion.Type
import com.esport.kompetitor.persistence.entity.*

data class StageResultViewDto(
    val id: Long,
    val type: Type,
    val resultPerGroups: List<GroupResultViewDto>,
) {
    companion object {
        fun fromStage(stage: Stage) = when(stage) {
            is LeagueStage -> fromLeague(stage)
            is GroupStage -> fromGroupStage(stage)
            is PlayOffStage -> fromPlayOff(stage)
            is FreeForAllStage -> fromFreeForAll(stage)
            else -> throw IllegalArgumentException("Unknown type: ${stage.javaClass}")
        }

        private fun fromFreeForAll(stage: FreeForAllStage) = StageResultViewDto(
            id = stage.id,
            type = Type.FREE_FOR_ALL,
            resultPerGroups = stage.pointsForEachGroup().map { map ->
                GroupResultViewDto(map.mapKeys { CompetitorViewDto.fromCompetitor(it.key) })
            }
        )

        private fun fromPlayOff(stage: PlayOffStage): StageResultViewDto {
            stage.pointsForEachGroup()
            return StageResultViewDto(
                id = stage.id,
                type = Type.PLAY_OFF,
                resultPerGroups = stage.groups.map { GroupResultViewDto.fromGroup(it) }
            )
        }

        private fun fromGroupStage(stage: GroupStage): StageResultViewDto {
            stage.pointsForEachGroup()
            return StageResultViewDto(
                id = stage.id,
                type = Type.GROUP,
                resultPerGroups = stage.groups.map { GroupResultViewDto.fromGroup(it) }
            )
        }

        private fun fromLeague(stage: LeagueStage) = StageResultViewDto(
            id = stage.id,
            type = Type.LEAGUE,
            resultPerGroups = stage.pointsForEachGroup().map { map ->
                GroupResultViewDto(map.mapKeys { CompetitorViewDto.fromCompetitor(it.key) })
            }
        )
    }
}
