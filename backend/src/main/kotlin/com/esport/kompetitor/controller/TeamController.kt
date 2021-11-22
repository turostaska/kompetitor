package com.esport.kompetitor.controller

import com.esport.kompetitor.persistence.dto.TeamCreationRequestDto
import com.esport.kompetitor.persistence.dto.TeamViewDto
import com.esport.kompetitor.persistence.service.TeamCreationFailedException
import com.esport.kompetitor.persistence.service.TeamService
import com.esport.kompetitor.security.JwtTokenService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("api/team")
class TeamController(
    private val teamService: TeamService,
    private val jwtTokenService: JwtTokenService,
) {
    @PostMapping("create")
    fun createTeam(
        @RequestBody teamCreationDto: TeamCreationRequestDto,
        request: HttpServletRequest,
    ): ResponseEntity<TeamViewDto> {
        return try {
            teamService.create(
                name = teamCreationDto.name,
                creatorId = jwtTokenService.getUserId(request)
            ).let {
                ResponseEntity.ok(it)
            }
        } catch (ex: TeamCreationFailedException) {
            ResponseEntity.badRequest().build()
        }
    }

    @GetMapping("")
    fun getAll(): ResponseEntity<List<TeamViewDto>> = ResponseEntity.ok(teamService.findAll())

}