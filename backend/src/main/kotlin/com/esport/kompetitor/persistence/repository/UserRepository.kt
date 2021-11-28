package com.esport.kompetitor.persistence.repository

import com.esport.kompetitor.persistence.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface UserRepository: JpaRepository<User, Long> {
    fun findByUsernameAndPassword(username: String, password: String): User?

    fun findByUsername(username: String): User?

    @Query("select (count(u) > 0) from User u where u.username = ?1")
    fun existsByUsername(username: String): Boolean

    fun readById(id: Long): User?



}