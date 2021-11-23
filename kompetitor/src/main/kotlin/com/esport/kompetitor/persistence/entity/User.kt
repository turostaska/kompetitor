package com.esport.kompetitor.persistence.entity

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import javax.persistence.*

@Entity
class User(
    @Column(nullable = false, unique = true)
    private val username: String,

    @Column(nullable = false)
    private val password: String,

    @ElementCollection(fetch = FetchType.EAGER)
    private val authorities: Set<GrantedAuthority> = setOf(),
): UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0L

    @ManyToOne
    @JoinColumn(nullable = true)
    var team: Team? = null

    @OneToMany(orphanRemoval = true, cascade = [CascadeType.ALL], mappedBy = "user")
    val invitations: MutableSet<TeamInvitation> = mutableSetOf()

    private val enabled: Boolean = true

    override fun getAuthorities() = authorities
    override fun getPassword() = password
    override fun getUsername() = username
    override fun isAccountNonExpired() = enabled
    override fun isAccountNonLocked() = enabled
    override fun isCredentialsNonExpired() = enabled
    override fun isEnabled() = enabled
}