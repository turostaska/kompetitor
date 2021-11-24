package com.esport.kompetitor.persistence.dto.auth

import com.esport.kompetitor.persistence.entity.User

data class UserViewDto(
    val id: Long,
    val username: String,
) {
    companion object {
        fun fromUser(user: User): UserViewDto = UserViewDto(id = user.id, username = user.username)
    }
}
