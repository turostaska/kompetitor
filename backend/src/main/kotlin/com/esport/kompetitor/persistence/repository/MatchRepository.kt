package com.esport.kompetitor.persistence.repository

import com.esport.kompetitor.persistence.entity.Match
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface MatchRepository : JpaRepository<Match, Long> {
    fun readById(id: Long): Match?

    @Query("select m from Match m where m.stage.id = ?1")
    fun findByStageId(id: Long): List<Match>


}