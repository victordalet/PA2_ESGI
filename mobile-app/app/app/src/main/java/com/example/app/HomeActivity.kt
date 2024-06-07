package com.example.app

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.ListView
import androidx.appcompat.app.AppCompatActivity
import okhttp3.OkHttpClient

class HomeActivity : AppCompatActivity() {

    private val client = OkHttpClient()
    private val cardList = mutableListOf<Card>()
    var arrayAdapter: CardAdapter? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

        val listView = findViewById<ListView>(R.id.listView)
        arrayAdapter = CardAdapter(this, cardList)
        listView.adapter = arrayAdapter


        val logoutButton = findViewById<Button>(R.id.logout)
        logoutButton.setOnClickListener(View.OnClickListener {
            logout()
        })

        val reserveButton = findViewById<Button>(R.id.reserve)
        reserveButton.setOnClickListener {
            startActivity(Intent(this, BrowserActivity::class.java))
        }


        listView.setOnItemClickListener { parent, view, position, id ->
            val item = parent.getItemAtPosition(position) as Card
            goToLocation(id)
        }

        fetchLocation()

    }


    private fun logout() {
        val sharedPref = getSharedPreferences("user", MODE_PRIVATE)
        with(sharedPref.edit()) {
            remove("token")
            commit()
        }
        finish()
    }

    private fun redirectLogin() {
        startActivity(Intent(this, MainActivity::class.java))
    }

    private fun fetchImage(card: Card) {
        val sharedPref = getSharedPreferences("user", AppCompatActivity.MODE_PRIVATE)
        val token = sharedPref.getString("token", null)
        if (token != null) {
            val apiPath = "https://apipcs.c2smr.fr/picture/location-${card.getId()}"
            try {
                val request =
                    okhttp3.Request.Builder().url(apiPath).get().addHeader("authorization", token)
                        .build()
                val response = client.newCall(request)
                response.enqueue(object : okhttp3.Callback {
                    override fun onFailure(call: okhttp3.Call, e: java.io.IOException) {
                        println("Error: $e")
                    }

                    override fun onResponse(call: okhttp3.Call, response: okhttp3.Response) {
                        val responseBody: String? = response.body()?.string()
                        println(responseBody)
                        runOnUiThread {
                            card.setImages(responseBody)
                            arrayAdapter?.notifyDataSetChanged()
                        }
                    }
                })
            } catch (e: Exception) {
                println("Error: $e")
            }
        }
    }

    private fun fetchLocation() {
        val sharedPref = getSharedPreferences("user", MODE_PRIVATE)
        val token = sharedPref.getString("token", null)
        if (token != null) {
            val apiPath = "https://apipcs.c2smr.fr/location/get-location-occupation"
            try {
                val request = okhttp3.Request.Builder().url(apiPath).post(
                    okhttp3.RequestBody.create(
                        okhttp3.MediaType.parse("application/json"), ""
                    )
                ).addHeader("authorization", token).build()
                val response = client.newCall(request)
                response.enqueue(object : okhttp3.Callback {
                    override fun onFailure(call: okhttp3.Call, e: java.io.IOException) {
                        println("Error: $e")
                    }

                    override fun onResponse(call: okhttp3.Call, response: okhttp3.Response) {
                        var user_email = sharedPref.getString("email", null)
                        val responseBody: String? = response.body()?.string()
                        if (responseBody != null) {
                            if (responseBody == "[]") {
                                return
                            }
                            val locations = responseBody.split("},{\"id").ifEmpty {
                                arrayOf(responseBody).toList()
                            }
                            locations.dropLast(1)
                            for (location in locations) {
                                var location_to_split = location
                                if (location[1] == ':') {
                                    location_to_split = "id" + location
                                }
                                val id =
                                    location_to_split.split("id")[1].split(":")[1].split(',')[0].replace(
                                        "\"", ""
                                    )
                                val name =
                                    location.split("name")[1].split(":")[1].split(",")[0].replace(
                                        "\"", ""
                                    )
                                val price =
                                    location.split("price")[1].split(":")[1].split(',')[0].replace(
                                        "\"", ""
                                    )
                                val locationId =
                                    location.split("location_occupation_id")[1].split(":")[1].split(
                                        ','
                                    )[0].replace(
                                        "\"", ""
                                    )
                                val createdBy =
                                    location.split("created_by")[1].split(":")[1].split(",")[0].replace(
                                        "\"", ""
                                    )
                                val fromDatetime =
                                    location.split("from_datetime")[1].split(":")[1].split(",")[0].replace(
                                        "\"", ""
                                    )
                                val toDatetime =
                                    location.split("to_datetime")[1].split(":")[1].split(",")[0].replace(
                                        "\"", ""
                                    )


                                if (createdBy != user_email) {

                                    runOnUiThread {
                                        cardList.add(
                                            Card(
                                                name,
                                                price,
                                                "Image",
                                                "$fromDatetime - $toDatetime",
                                                createdBy,
                                                id.toInt(),
                                                locationId.toInt()
                                            )
                                        )
                                    }
                                }
                            }
                            runOnUiThread {
                                for (card in cardList) {
                                    fetchImage(card)
                                }
                                arrayAdapter?.notifyDataSetChanged()
                            }
                        }

                    }
                })
            } catch (e: Exception) {
                println("Error: $e")
            }
        } else {
            redirectLogin()
        }
    }

    private fun goToLocation(number: Number) {
        val sharedPref = getSharedPreferences("user", MODE_PRIVATE)
        with(sharedPref.edit()) {
            putString("locationOccupationId", cardList[number.toInt()].getLocationId().toString())
            commit()
        }
        with(sharedPref.edit()) {
            putString("locationID", cardList[number.toInt()].getId().toString())
            commit()
        }
        startActivity(Intent(this, ReserveActivity::class.java))
    }
}
