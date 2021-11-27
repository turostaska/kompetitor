package com.esport.kompetitor.persistence.entity

import javax.persistence.*

@Table(name = "COMPETITION_GROUP")
@Entity
class Group(
    @OneToMany(cascade = [CascadeType.REFRESH])
    @JoinColumn
    val competitors: MutableSet<Competitor> = mutableSetOf(),

    @OneToMany(cascade = [CascadeType.REFRESH])
    @JoinColumn
    val groupMatches: MutableSet<Match> = mutableSetOf(),

    @ElementCollection
    val scores: MutableMap<Competitor, Int> = competitors.associateWith { 0 } as MutableMap<Competitor, Int>,
) {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0L
}