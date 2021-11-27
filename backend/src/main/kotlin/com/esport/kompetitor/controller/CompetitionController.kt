package com.esport.kompetitor.controller

import com.esport.kompetitor.persistence.dto.competition.AddRefereeRequestDto
import com.esport.kompetitor.persistence.dto.competition.CompetitionViewDto
import com.esport.kompetitor.persistence.dto.competition.StageResultViewDto
import com.esport.kompetitor.persistence.service.CompetitionFailureException
import com.esport.kompetitor.persistence.service.CompetitionService
import com.esport.kompetitor.security.JwtTokenService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("api/competition")
class CompetitionController(
    private val competitionService: CompetitionService,
    private val jwtTokenService: JwtTokenService,
) {
    @GetMapping("")
    fun getAll(): ResponseEntity<List<CompetitionViewDto>> = ResponseEntity.ok(competitionService.findAll())

    @PostMapping("create")
    fun createCompetition(
        @RequestBody competitionViewDto: CompetitionViewDto,
        request: HttpServletRequest,
    ): ResponseEntity<CompetitionViewDto> = try {
        competitionService.create(
            adminId = jwtTokenService.getUserId(request),
            competitionView = competitionViewDto
        ).let { ResponseEntity.ok(it) }
    } catch (e: Exception) {
        when(e) {
            is CompetitionFailureException, is IllegalArgumentException -> ResponseEntity.badRequest().build()
            else -> throw e
        }
    }
    
    @PostMapping("add_referee")
    fun addReferee(
        @RequestBody addRefereeRequest: AddRefereeRequestDto,
        request: HttpServletRequest,
    ): ResponseEntity<CompetitionViewDto> = try {
        competitionService.addReferee(
            adminId = jwtTokenService.getUserId(request),
            competitionId = addRefereeRequest.competitionId,
            refereeName = addRefereeRequest.refereeName,
        ).let { ResponseEntity.ok(it) }
    } catch (e: CompetitionFailureException) { ResponseEntity.badRequest().build() }

    @GetMapping("{competitionId}/join")
    fun join(
        @PathVariable competitionId: Long,
        request: HttpServletRequest,
    ): ResponseEntity<CompetitionViewDto> = try {
        competitionService.joinCompetition(
            userId = jwtTokenService.getUserId(request),
            competitionId = competitionId,
        ).let { ResponseEntity.ok(it) }
    } catch (e: Exception) {
        when(e) {
            is CompetitionFailureException, is IllegalArgumentException -> ResponseEntity.badRequest().build()
            else -> throw e
        }
    }

    @GetMapping("{competitionId}/results")
    fun getResults(
        @PathVariable competitionId: Long,
        request: HttpServletRequest,
    ): ResponseEntity<List<StageResultViewDto>> = try {
        competitionService.getResults(
            competitionId = competitionId,
        ).let { ResponseEntity.ok(it) }
    } catch (e: Exception) {
        when(e) {
            is CompetitionFailureException, is IllegalArgumentException -> ResponseEntity.badRequest().build()
            else -> throw e
        }
    }
}