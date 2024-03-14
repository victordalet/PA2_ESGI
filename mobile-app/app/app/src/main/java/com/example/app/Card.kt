package com.example.app

class Card// constructor
    (
    private var title: String?,
    private var price: String?,
    private var image: String?,
    private var description: String?,
    private var createdBy: String?,
    private var id: Int?,
    private var locationId: Int?,

    ) {
    fun getTitle(): String? {
        return title
    }

    fun getPrice(): String? {
        return price
    }

    fun getImage(): String? {
        return image
    }

    fun getDescription(): String? {
        return description
    }

    fun getCreatedBy(): String? {
        return createdBy
    }

    fun getId(): Int? {
        return id
    }

    fun getLocationId(): Int? {
        return locationId
    }

}