package com.esport.kompetitor.controller

import com.esport.kompetitor.persistence.dto.competition.MatchViewDto
import com.esport.kompetitor.persistence.service.CompetitionFailureException
import com.esport.kompetitor.persistence.service.CompetitionService
import com.esport.kompetitor.security.JwtTokenService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("api/referee")
class RefereeController(
    private val jwtTokenService: JwtTokenService,
    private val competitionService: CompetitionService,
) {
    @PostMapping("update")
    fun updateMatch(
        @RequestBody update: MatchViewDto,
        request: HttpServletRequest,
    ): ResponseEntity<MatchViewDto> = try {
        competitionService.updateMatch(refereeId = jwtTokenService.getUserId(request), update = update).let {
            ResponseEntity.ok(it)
        }
    } catch (e: Exception) {
        when(e) {
            is CompetitionFailureException, is IllegalArgumentException -> ResponseEntity.badRequest().build()
            else -> throw e
        }
    }


}