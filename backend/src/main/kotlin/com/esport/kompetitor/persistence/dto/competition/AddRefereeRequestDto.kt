package com.esport.kompetitor.persistence.dto.competition

data class AddRefereeRequestDto(
    val refereeName: String,
    val competitionId: Long,
)
