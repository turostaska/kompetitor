package com.esport.kompetitor.persistence.entity

import javax.persistence.*

@Entity
class Team(
    @Column(nullable = false, unique = true)
    val name: String,

    @OneToMany(cascade = [CascadeType.REFRESH])
    val members: Set<User> = setOf(),
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    var id: Long = 0L

    //todo: css
}