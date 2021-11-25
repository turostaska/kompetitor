package com.esport.kompetitor.persistence.service

import com.esport.kompetitor.persistence.dto.auth.LoginRequestDto
import com.esport.kompetitor.persistence.dto.auth.SignUpRequestDto
import com.esport.kompetitor.persistence.entity.User
import com.esport.kompetitor.persistence.repository.UserRepository
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Component

class UsernameTakenException(
    username: String,
) : RuntimeException("There's already a user named '$username'")

@Component
class UserService(
    private val userRepository: UserRepository,
    private val authenticationManager: AuthenticationManager,
    private val passwordEncoder: BCryptPasswordEncoder,
): UserDetailsService {
    override fun loadUserByUsername(username: String) =
        userRepository.findByUsername(username) ?: throw UsernameNotFoundException("User $username not found.")

    @Throws(UsernameTakenException::class)
    fun signUp(signUpRequestDto: SignUpRequestDto): User = signUpRequestDto.let{
        if (userRepository.existsByUsername(it.username))
            throw UsernameTakenException(it.username)

        userRepository.save(User(
            username = it.username,
            password = passwordEncoder.encode(it.password),
            authorities = setOf(),
        ))
    }

    @Throws(BadCredentialsException::class)
    fun login(loginRequest: LoginRequestDto): User {
        val authenticate = loginRequest.let {
            authenticationManager.authenticate(UsernamePasswordAuthenticationToken(it.username, it.password))
        }

        return authenticate.principal as User
    }
}