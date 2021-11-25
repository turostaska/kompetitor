package com.esport.kompetitor.persistence.entity

import org.hibernate.validator.constraints.Range
import java.time.LocalDateTime
import javax.persistence.*

@Entity
class Competition(
    // todo: name?

    @OneToOne
    val admin: User,

    @Range(min = 2, max = 128)
    val competitorLimit: Int,

    val startDate: LocalDateTime,

    @Enumerated(value = EnumType.STRING)
    val type: Type,

    @OneToMany(cascade = [CascadeType.ALL], orphanRemoval = true)
    val stages: MutableList<Stage> = mutableListOf(),
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    var id: Long = 0L

    @OneToMany(cascade = [CascadeType.REFRESH])
    @JoinColumn
    val competitors: MutableSet<Competitor> = mutableSetOf()

    @OneToMany(cascade = [CascadeType.REFRESH])
    @JoinColumn
    val referees: MutableSet<User> = mutableSetOf()

    var currentStage: Int = 0

    var concluded = false

    companion object {
        enum class Type { TEAM, INDIVIDUAL }
    }

    // todo: css
}