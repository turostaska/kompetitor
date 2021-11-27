import React from 'react';

class CompetitionDTO {
    constructor(id, admin, competitorLimit, startDate, type, stages, competitors, referees) {
        this.id = id;
        this.admin = admin;
        this.competitorLimit = competitorLimit;
        this.startDate = new Date(startDate);
        this.type= type;
        this.stages = stages;
        this.competitors = competitors;
        this.referees = referees;
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