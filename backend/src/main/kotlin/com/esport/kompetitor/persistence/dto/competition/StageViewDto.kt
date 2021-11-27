package com.esport.kompetitor.persistence.dto.competition

import com.esport.kompetitor.persistence.entity.*

data class StageViewDto(
    val id: Long? = null,
    val type: Type,
    val numCompetitorsIn: Int,
    val numCompetitorsOut: Int,
    val numCompetitorsPerMatch: Int,
    val numLegs: Int,
    val matches: Set<MatchViewDto> = setOf(),
    val numTeamsPerGroup: Int? = null,
    val pointsForWin: Int? = null,
    val pointsForTie: Int? = null,
    val pointsForLoss: Int? = null,
    val groups: List<GroupViewDto>? = null,
) {
    companion object {
        enum class Type {
            LEAGUE, GROUP, PLAY_OFF, FREE_FOR_ALL
        }

        private fun fromLeague(league: LeagueStage) = league.run { StageViewDto(
            id = id,
            type = Type.LEAGUE,
            numCompetitorsIn = numCompetitorsIn,
            numCompetitorsOut = numCompetitorsOut,
            numCompetitorsPerMatch = numCompetitorsPerMatch,
            numLegs = numLegs,
            matches = matches.map { MatchViewDto.fromMatch(it) }.toSet(),
            pointsForWin = pointsForWin,
            pointsForTie = pointsForTie,
            pointsForLoss = pointsForLoss,
        ) }

        private fun fromGroupStage(group: GroupStage) = group.run { StageViewDto(
            id = id,
            type = Type.GROUP,
            numCompetitorsIn = numCompetitorsIn,
            numCompetitorsOut = numCompetitorsOut,
            numCompetitorsPerMatch = numCompetitorsPerMatch,
            numLegs = numLegs,
            matches = matches.map { MatchViewDto.fromMatch(it) }.toSet(),
            numTeamsPerGroup = numTeamsPerGroup,
            pointsForWin = pointsForWin,
            pointsForTie = pointsForTie,
            pointsForLoss = pointsForLoss,
            groups = groups.map { GroupViewDto.fromGroup(it) },
        ) }

        private fun fromPlayOff(playOff: PlayOffStage) = playOff.run { StageViewDto(
            id = id,
            type = Type.PLAY_OFF,
            numCompetitorsIn = numCompetitorsIn,
            numCompetitorsOut = numCompetitorsOut,
            numCompetitorsPerMatch = numCompetitorsPerMatch,
            numLegs = numLegs,
            matches = matches.map { MatchViewDto.fromMatch(it) }.toSet(),
            groups = groups.map { GroupViewDto.fromGroup(it) },
        ) }

        private fun fromFreeForAll(freeForAll: FreeForAllStage) = freeForAll.run { StageViewDto(
            id = id,
            type = Type.FREE_FOR_ALL,
            numCompetitorsIn = numCompetitorsIn,
            numCompetitorsOut = numCompetitorsOut,
            numCompetitorsPerMatch = numCompetitorsPerMatch,
            numLegs = numLegs,
            matches = matches.map { MatchViewDto.fromMatch(it) }.toSet(),
        ) }

        fun fromStage(stage: Stage) = when(stage) {
            is LeagueStage -> fromLeague(stage)
            is GroupStage -> fromGroupStage(stage)
            is PlayOffStage -> fromPlayOff(stage)
            is FreeForAllStage -> fromFreeForAll(stage)
            else -> throw IllegalArgumentException("Unknown type: ${stage.javaClass}")
        }
    }

    fun toStage(competition: Competition): Stage {
        require(matches.isEmpty()) { "Only stages that have no matches yet should be constructed into objects." }
        return when(type) {
            Type.LEAGUE -> LeagueStage(
                competition = competition,
                competitorsIn = numCompetitorsIn,
                competitorsOut = numCompetitorsOut,
                numLegs = numLegs,
                pointsForWin = pointsForWin!!,
                pointsForTie = pointsForTie!!,
                pointsForLoss = pointsForLoss!!)
            Type.GROUP -> GroupStage(
                competition = competition,
                competitorsIn = numCompetitorsIn,
                competitorsOut = numCompetitorsOut,
                numLegs = numLegs,
                numTeamsPerGroup = numTeamsPerGroup!!,
                pointsForWin = pointsForWin!!,
                pointsForTie = pointsForTie!!,
                pointsForLoss = pointsForLoss!!)
            Type.PLAY_OFF -> PlayOffStage(
                competition = competition,
                competitorsIn = numCompetitorsIn,
                competitorsOut = numCompetitorsOut,
                numLegs = numLegs)
            Type.FREE_FOR_ALL -> FreeForAllStage(
                competition = competition,
                competitorsIn = numCompetitorsIn,
                competitorsOut = numCompetitorsOut,
                numCompetitorsPerMatch = numCompetitorsPerMatch,
                numLegs = numLegs)
        }
    }
}