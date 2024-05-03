package com.example.app

class Services {

    var name = ""
    var fromDatetime = ""
    var toDatetime = ""
    var state = ""
    var id = ""
    var nfc = ""


    constructor(
        name: String,
        fromDatetime: String,
        toDatetime: String,
        state: String,
        id: String,
        nfc: String
    ) {
        this.name = name
        this.state = state
        this.fromDatetime = fromDatetime
        this.toDatetime = toDatetime
        this.id = id
        this.nfc = nfc
    }

}