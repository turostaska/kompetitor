package com.esport.kompetitor.persistence.entity

import org.hibernate.validator.constraints.Range
import javax.persistence.*

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
abstract class Stage(
    @ManyToOne
    @JoinColumn
    open val competition: Competition,

    @Range(min = 2, max = 128)
    open val numCompetitorsIn: Int,

    @Range(min = 1, max = 127)
    open val numCompetitorsOut: Int,

    @Range(min = 2, max = 128)
    open val numCompetitorsPerMatch: Int,

    @Range(min = 1, max = 16)
    open val numLegs: Int,
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    open var id: Long = 0L

    @OneToMany(cascade = [CascadeType.ALL], orphanRemoval = true)
    open val matches: MutableSet<Match> = mutableSetOf()

    open var concluded = false

    abstract fun draw()

    abstract fun pointsForEachGroup(): List<Map<Competitor, Int>>

    abstract fun advancingCompetitors(): Set<Competitor>
}