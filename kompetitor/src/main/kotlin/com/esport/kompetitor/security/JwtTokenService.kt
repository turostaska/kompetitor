package com.esport.kompetitor.security

import com.esport.kompetitor.persistence.entity.User
import io.jsonwebtoken.*
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpHeaders
import org.springframework.stereotype.Component
import java.util.*
import javax.servlet.http.HttpServletRequest

// source: https://www.toptal.com/spring/spring-security-tutorial
@Component
class JwtTokenService {
    private val jwtSecret = "zdtlD3JK56m6wTTgsNFhqzjqP"
    private val jwtIssuer = "kompetitor"

    private val logger: Logger = LoggerFactory.getLogger(javaClass)

    fun generateAccessToken(user: User): String = Jwts.builder()
        .setSubject("${user.id},${user.username}")
        .setIssuer(jwtIssuer)
        .setIssuedAt(Date())
        .setExpiration(Date(System.currentTimeMillis() + 60 * 60 * 1000)) // 1 hour
        .signWith(SignatureAlgorithm.HS512, jwtSecret)
        .compact()

    private fun getClaims(token: String): Claims = Jwts.parser()
        .setSigningKey(jwtSecret)
        .parseClaimsJws(token)
        .body

    fun getUserId(token: String) = getClaims(token).subject.split(",").toTypedArray()[0].toLong()

    fun getUserId(request: HttpServletRequest) = getUserId(getToken(request))

    fun getUsername(token: String) = getClaims(token).subject.split(",").toTypedArray()[1]

    fun getExpirationDate(token: String): Date = getClaims(token).expiration

    fun getToken(request: HttpServletRequest): String = request.
        getHeader(HttpHeaders.AUTHORIZATION).split(" ").toTypedArray()[1]

    fun validate(token: String): Boolean {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token)
            return true
        } catch (ex: SignatureException) {
            logger.error("Invalid JWT signature - ${ex.message}")
        } catch (ex: MalformedJwtException) {
            logger.error("Invalid JWT token - ${ex.message}")
        } catch (ex: ExpiredJwtException) {
            logger.error("Expired JWT token - ${ex.message}")
        } catch (ex: UnsupportedJwtException) {
            logger.error("Unsupported JWT token - ${ex.message}")
        } catch (ex: IllegalArgumentException) {
            logger.error("JWT claims string is empty - ${ex.message}")
        }
        return false
    }
}