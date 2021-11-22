package com.esport.kompetitor.controller

import com.esport.kompetitor.persistence.service.UserService
import com.esport.kompetitor.persistence.service.UsernameTakenException
import com.esport.kompetitor.security.JwtTokenService
import com.esport.kompetitor.persistence.dto.LoginRequestDto
import com.esport.kompetitor.persistence.dto.SignUpRequestDto
import com.esport.kompetitor.persistence.dto.UserViewDto
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/auth")
class AuthenticationController(
    private val userService: UserService,
    private val jwtTokenService: JwtTokenService,
) {
    @PostMapping("sign-up")
    fun signUp(@RequestBody signUpRequest: SignUpRequestDto): ResponseEntity<UserViewDto> = try {
        userService.signUp(signUpRequest).let {
            ResponseEntity.ok(UserViewDto.fromUser(it))
        }
    } catch (e: UsernameTakenException) {
        ResponseEntity.badRequest().build()
    }

    @PostMapping("login")
    fun login(@RequestBody loginRequest: LoginRequestDto): ResponseEntity<UserViewDto> = try {
        userService.login(loginRequest).let {
            ResponseEntity.ok()
                .header(
                    HttpHeaders.AUTHORIZATION, jwtTokenService.generateAccessToken(it)
                )
                .body(UserViewDto.fromUser(it))
        }
    } catch (e: BadCredentialsException) {
        ResponseEntity.badRequest().build()
    }

    // todo: logout
}