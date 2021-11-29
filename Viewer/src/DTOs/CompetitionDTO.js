import React from 'react';

class CompetitionDTO {
    constructor(competitorLimit, startDate, type, stages) {
        this.competitorLimit = competitorLimit;
        this.startDate = new Date(startDate);
        this.type= type;
        this.stages = stages;
    }

    /* val id: Long? = null,
     val admin: UserViewDto? = null,
     val competitorLimit: Int,
     val startDate: LocalDateTime,
     val type: Competition.Companion.Type,
     val competitors: Set<CompetitorViewDto> = setOf(),
     val referees: Set<UserViewDto> = setOf(),
     val stages: List<StageViewDto>,*/
}
export default CompetitionDTO