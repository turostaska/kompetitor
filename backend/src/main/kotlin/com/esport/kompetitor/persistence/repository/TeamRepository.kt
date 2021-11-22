package com.esport.kompetitor.persistence.repository;

import com.esport.kompetitor.persistence.entity.Team
import org.springframework.data.jpa.repository.JpaRepository

interface TeamRepository : JpaRepository<Team, Long> {
    fun existsByName(name: String): Boolean
}