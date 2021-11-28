package com.esport.kompetitor.persistence.repository;

import com.esport.kompetitor.persistence.entity.Competition
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface CompetitionRepository : JpaRepository<Competition, Long> {
    fun readById(id: Long): Competition?


    @Query("select c from Competition c left join c.referees referees where referees.id = ?1")
    fun findRefereedBy(id: Long): List<Competition>

}