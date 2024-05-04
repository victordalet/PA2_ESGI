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

    constructor(context: AdminHomeActivity, cardList: MutableList<Card>) : this() {
        this.context = context
        this.cardList = cardList
    }

    private lateinit var cardList: MutableList<Card>
    private lateinit var context: Any
    private lateinit var title: TextView
    private lateinit var price: TextView
    private lateinit var image: View
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
            view = View.inflate(parent.context, R.layout.card, null)
        }
        view = LayoutInflater.from(context as Context?).inflate(R.layout.card, parent, false)
        title = view.findViewById(R.id.title)
        price = view.findViewById(R.id.price)
        image = view.findViewById(R.id.imageView)
        val description = view.findViewById<TextView>(R.id.description)
        title.text = cardList[position].getTitle()
        price.text = cardList[position].getPrice()
        description.text = cardList[position].getDescription()
        var base64Image = cardList[position].getImage() as String
        if (base64Image != "Image") {
            base64Image = base64Image.split(":\"")[1].split("\"")[0]
            val imageT = android.util.Base64.decode(base64Image, android.util.Base64.DEFAULT)
            val bitmap = android.graphics.BitmapFactory.decodeByteArray(imageT, 0, imageT.size)
            image.background =
                android.graphics.drawable.BitmapDrawable((context as Context).resources, bitmap)
            image.layoutParams.height = 200
            image.layoutParams.width = 200
        }



        return view
    }


}

