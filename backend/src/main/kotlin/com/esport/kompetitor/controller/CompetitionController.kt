package com.esport.kompetitor.controller

import com.esport.kompetitor.persistence.dto.competition.CompetitionViewDto
import com.esport.kompetitor.persistence.service.CompetitionService
import com.esport.kompetitor.security.JwtTokenService
import org.springframework.http.ResponseEntity
import org.springframework.security.core.userdetails.UsernameNotFoundException
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
        ).let {
            ResponseEntity.ok(it)
        }
    } catch (e: UsernameNotFoundException) {
        ResponseEntity.badRequest().build()
    }
}