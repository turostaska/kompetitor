package com.esport.kompetitor.persistence.repository;

import com.esport.kompetitor.persistence.entity.TeamInvitation
import org.springframework.data.jpa.repository.JpaRepository

interface InvitationRepository : JpaRepository<TeamInvitation, Long> {
    fun readById(id: Long): TeamInvitation?

}