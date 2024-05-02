package com.example.app

import android.content.Context
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.TextView

class ServicesAdapter : BaseAdapter {

    var context: Context
    var services = mutableListOf<Services>()

    constructor(context: Context, services: MutableList<Services>) : super() {
        this.context = context
        this.services = services
    }

    override fun getCount(): Int {
        return services.size
    }

    override fun getItem(position: Int): Any {
        return services[position]
    }

    override fun getItemId(position: Int): Long {
        return position.toLong()
    }

    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        var view: View
        if (convertView == null) {
            view = View.inflate(this.context, R.layout.services, null)
        } else {
            view = convertView
        }
        var currentService = services[position]
        view.findViewById<TextView>(R.id.service_name).text = currentService.name
        var state = currentService.state
        if (state == "1") {
            view.findViewById<TextView>(R.id.service_state).text = "Valid"
        }
        if (state == "2") {
            view.findViewById<TextView>(R.id.service_state).text = "Finished"
        } else {
            view.findViewById<TextView>(R.id.service_state).text = "In validation"
        }
        return view
    }

}