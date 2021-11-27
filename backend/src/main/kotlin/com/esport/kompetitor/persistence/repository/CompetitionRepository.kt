package com.esport.kompetitor.persistence.repository;

import com.esport.kompetitor.persistence.entity.Competition
import org.springframework.data.jpa.repository.JpaRepository

interface CompetitionRepository : JpaRepository<Competition, Long> {
    fun readById(id: Long): Competition?

}