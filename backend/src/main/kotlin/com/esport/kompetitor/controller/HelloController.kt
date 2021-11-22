package com.esport.kompetitor.controller

import com.esport.kompetitor.security.JwtTokenService
import org.springframework.http.HttpHeaders
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("hello")
class HelloController(
    private val jwtTokenService: JwtTokenService,
) {
    @GetMapping
    fun hello(request: HttpServletRequest): String {
        val token = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ").toTypedArray()[1]
        return "hello, ${jwtTokenService.getUsername(token)}"
    }
}