package com.example.app

class Services {

    var name = ""
    var fromDatetime = ""
    var toDatetime = ""
    var state = ""


    constructor(name: String,fromDatetime: String, toDatetime: String , state: String) {
        this.name = name
        this.state = state
        this.fromDatetime = fromDatetime
        this.toDatetime = toDatetime
    }

}