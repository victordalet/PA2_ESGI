package com.example.app

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.TextView

class CardAdapter() : BaseAdapter() {


    constructor(context: HomeActivity, cardList: MutableList<Card>) : this() {
        this.context = context
        this.cardList = cardList
    }

    constructor(context: ReserveActivity, cardList: MutableList<Card>) : this() {
        this.context = context
        this.cardList = cardList
    }

    private lateinit var cardList: MutableList<Card>
    private lateinit var context: Any
    private lateinit var title: TextView
    private lateinit var price: TextView
    override fun getCount(): Int {
        return cardList.size
    }

    override fun getItem(position: Int): Any {
        return cardList[position]
    }

    override fun getItemId(position: Int): Long {
        return position.toLong()
    }

    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View? {
        var view: View? = convertView
        if (view == null) {
            view = View.inflate(parent.context, R.layout.card, null)
        }
        view = LayoutInflater.from(context as Context?).inflate(R.layout.card, parent, false)
        title = view.findViewById(R.id.title)
        price = view.findViewById(R.id.price)
        title.text = cardList[position].getTitle()
        price.text = cardList[position].getPrice()
        return view
    }


}