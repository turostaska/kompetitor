package com.esport.kompetitor.persistence.entity

import javax.persistence.*

@Entity
class TeamInvitation(
    @ManyToOne
    @JoinColumn(nullable=false)
    val user: User,

    @OneToOne
    @MapsId
    val team: Team,
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    var id: Long = 0L
}