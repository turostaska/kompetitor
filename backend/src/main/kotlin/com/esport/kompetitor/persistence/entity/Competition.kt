package com.esport.kompetitor.persistence.entity

import org.hibernate.validator.constraints.Range
import java.time.LocalDateTime
import javax.persistence.*

@Entity
class Competition(
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

    @ManyToMany(cascade = [CascadeType.REFRESH])
    @JoinTable
    var competitors: MutableSet<Competitor> = mutableSetOf()

    @ManyToMany(cascade = [CascadeType.REFRESH])
    @JoinTable
    val referees: MutableSet<User> = mutableSetOf()

    @Range(min = -1, max = 128)
    var currentStage: Int = -1

    var concluded = false

    @Lob
    var cssFile: ByteArray = byteArrayOf()

    companion object {
        enum class Type { TEAM, INDIVIDUAL }
    }
}