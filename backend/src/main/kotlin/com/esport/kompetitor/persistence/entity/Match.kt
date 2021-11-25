package com.esport.kompetitor.persistence.entity

import javax.persistence.*

@Entity
@Table(name = "competitive_match")
class Match(
    @ManyToOne
    @JoinColumn
    val stage: Stage,

    @OneToMany(cascade = [CascadeType.REFRESH])
    @JoinColumn
    val competitors: MutableList<Competitor>
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    var id: Long = 0L

    @ElementCollection
    val scores: MutableMap<Competitor, Int> = competitors.associateWith { 0 } as MutableMap<Competitor, Int>

    var concluded = false
}