package com.esport.kompetitor.controller

import com.esport.kompetitor.persistence.dto.invitation.AcceptInvitationDto
import com.esport.kompetitor.persistence.dto.invitation.InvitationRequestDto
import com.esport.kompetitor.persistence.dto.team.TeamCreationRequestDto
import com.esport.kompetitor.persistence.dto.team.TeamViewDto
import com.esport.kompetitor.persistence.service.InvitationFailedException
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
    ): ResponseEntity<TeamViewDto> = try {
        teamService.create(
            name = teamCreationDto.name,
            creatorId = jwtTokenService.getUserId(request)
        ).let {
            ResponseEntity.ok(it)
        }
    } catch (ex: TeamCreationFailedException) {
        ResponseEntity.badRequest().build()
    }

    @GetMapping("")
    fun getAll(): ResponseEntity<List<TeamViewDto>> = ResponseEntity.ok(teamService.findAll())

    @GetMapping("leave")
    fun leaveTeam(request: HttpServletRequest) =
        teamService.leaveTeam(jwtTokenService.getUserId(request)).let { ResponseEntity.ok(null) }

    @GetMapping("invitations")
    fun getAllInvitations(request: HttpServletRequest) =
        teamService.getInvitationsOf(jwtTokenService.getUserId(request)).let { ResponseEntity.ok(it) }

    @PostMapping("invitations/send")
    fun sendInvitation(
        @RequestBody invitationRequest: InvitationRequestDto,
        request: HttpServletRequest
    ) = try {
        teamService.sendInvitation(
            fromId = jwtTokenService.getUserId(request),
            toName = invitationRequest.receiverName,
        ).let { ResponseEntity.ok(it) }
    } catch (e: InvitationFailedException) {
        ResponseEntity.badRequest().build()
    }

    @PostMapping("invitations/accept")
    fun acceptInvitation(
        @RequestBody acceptRequest: AcceptInvitationDto,
        request: HttpServletRequest
    ) = try {
        teamService.acceptInvitation(
            userId = jwtTokenService.getUserId(request),
            invitationId = acceptRequest.invitationId,
        ).let { ResponseEntity.ok(it) }
    } catch (e: InvitationFailedException) {
        ResponseEntity.badRequest().build()
    }

}