package com.esport.kompetitor.persistence.entity

import javax.persistence.*

@Table(name = "COMPETITION_GROUP")
@Entity
class Group(
    @ManyToMany(cascade = [CascadeType.REFRESH])
    @JoinTable
    val competitors: MutableSet<Competitor> = mutableSetOf(),

    @ManyToOne(cascade = [CascadeType.REFRESH])
    @JoinColumn
    val stage: Stage,

    @ElementCollection
    val scores: MutableMap<Competitor, Int> = competitors.associateWith { 0 } as MutableMap<Competitor, Int>,
) {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0L

    @OneToMany(cascade = [CascadeType.REFRESH])
    val groupMatches: MutableSet<Match> = mutableSetOf()
}