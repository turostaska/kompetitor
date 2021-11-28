package com.esport.kompetitor.persistence.entity

import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.OneToMany

@Entity
class Team(
    @Column(unique = true)
    val name: String,

    @OneToMany(cascade = [CascadeType.REFRESH])
    val members: MutableSet<User> = mutableSetOf(),
): Competitor()