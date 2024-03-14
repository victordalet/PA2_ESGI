package com.example.app

import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.TextView

class MessagesAdapter() : BaseAdapter() {

    private lateinit var context: ReserveActivity
    private lateinit var messages: MutableList<Messages>

    constructor(context: ReserveActivity, messages: MutableList<Messages>) : this() {
        this.context = context
        this.messages = messages
    }

    override fun getCount(): Int {
        return messages.size
    }

    override fun getItem(position: Int): Any {
        return messages[position]
    }

    override fun getItemId(position: Int): Long {
        return position.toLong()
    }

    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        var view: View? = convertView
        if (view == null) {
            if (parent != null) {
                view = View.inflate(parent.context, R.layout.message, null)
            }
        }
        val message = messages[position]
        val messageView = view?.findViewById(R.id.messageUser) as TextView
        messageView.text = message.getMessage()
        return view

    }
}