package com.esport.kompetitor.controller

import com.esport.kompetitor.persistence.dto.competition.*
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
    fun getAll(): ResponseEntity<List<CompetitionViewDto>> {
        return ResponseEntity.ok(competitionService.findAll())
    }

    @GetMapping("{competitionId}")
    fun getById(@PathVariable competitionId: Long,): ResponseEntity<CompetitionViewDto> = try {
        ResponseEntity.ok(competitionService.competitionById(competitionId).let {
            CompetitionViewDto.fromCompetition(it)
        })
    } catch (e: CompetitionFailureException) {
        ResponseEntity.badRequest().build()
    }

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

    @GetMapping("{competitionId}/current_stage_concluded")
    fun isCurrentStageConcluded(@PathVariable competitionId: Long,) =
        competitionService.currentStageIsConcluded(competitionId).let { ResponseEntity.ok(it) }

    @GetMapping("{competitionId}/advance")
    fun advanceToNextStage(
        @PathVariable competitionId: Long,
        request: HttpServletRequest,
    ): ResponseEntity<StageViewDto> = try {
        competitionService.advanceToNextStage(
            competitionId = competitionId,
            refereeId = jwtTokenService.getUserId(request)
        ).let { ResponseEntity.ok(it) }
    } catch (e: Exception) {
        when(e) {
            is CompetitionFailureException, is IllegalArgumentException -> ResponseEntity.badRequest().build()
            else -> throw e
        }
    }

    @PostMapping("{competitionId}/css")
    fun uploadCss(
        @RequestBody cssFile: CssUploadDto,
        @PathVariable competitionId: Long,
        request: HttpServletRequest,
    ) : ResponseEntity<String> = try {
        competitionService.uploadCss(
            competitionId = competitionId,
            adminId = jwtTokenService.getUserId(request),
            cssFile = cssFile.fileBase64
        ).let { ResponseEntity.ok(it.decodeToString()) }
    } catch (e: Exception) {
        when(e) {
            is CompetitionFailureException, is IllegalArgumentException -> ResponseEntity.badRequest().build()
            else -> throw e
        }
    }

    @GetMapping("{competitionId}/css")
    fun getCss(
        @PathVariable competitionId: Long,
        request: HttpServletRequest,
    ): ResponseEntity<String> = try {
        competitionService.getCss(competitionId).decodeToString().let { ResponseEntity.ok(it) }
    } catch (e: Exception) {
        when(e) {
            is CompetitionFailureException, is IllegalArgumentException -> ResponseEntity.badRequest().build()
            else -> throw e
        }
    }

    @GetMapping("refereed_by")
    fun getRefereedBy(
        request: HttpServletRequest,
    ) = competitionService.competitionsRefereedBy(jwtTokenService.getUserId(request)).
        map { CompetitionViewDto.fromCompetition(it) }
}