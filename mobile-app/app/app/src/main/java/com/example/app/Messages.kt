package com.example.app

class Messages(
    private var createdBy: String?,
    private var message: String?,
) {

    fun getCreatedBy(): String? {
        return createdBy
    }

    fun getMessage(): String? {
        return message
    }
}