package com.example.app

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.widget.Button
import android.widget.EditText
import android.widget.ListView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import okhttp3.OkHttpClient


class ReserveActivity : AppCompatActivity() {

    private val cardList = mutableListOf<Card>()
    private val messageList = mutableListOf<Messages>()
    private val client = OkHttpClient()
    private lateinit var messageInput: EditText
    private lateinit var sendButton: Button
    private var messageAdapter: MessagesAdapter? = null
    var arrayAdapter: CardAdapter? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_reserve)

        this.messageInput = findViewById(R.id.message)
        this.sendButton = findViewById(R.id.sendMessage)

        sendButton.setOnClickListener {
            sendMessage()
        }

        val messageListView = findViewById<ListView>(R.id.listMessagesView)
        val messageAdapter = MessagesAdapter(this, messageList)
        messageListView.adapter = messageAdapter

        val listView = findViewById<ListView>(R.id.listServicesView)
        val arrayAdapter = CardAdapter(this, cardList)
        listView.adapter = arrayAdapter


        fetchServices()
        fetchMessages()


        val backHome = findViewById<Button>(R.id.backHome)
        backHome.setOnClickListener {
            finish()
        }


    }


    private fun fetchMessages() {
        val sharedPref = getSharedPreferences("user", MODE_PRIVATE)
        val token = sharedPref.getString("token", null)
        val locationID = sharedPref.getString("locationOccupationId", null)
        if (token != null) {
            val apiPath = "http://10.66.125.162:3001/location/get-messages"
            try {
                val request = okhttp3.Request.Builder().url(apiPath).post(
                    okhttp3.RequestBody.create(
                        okhttp3.MediaType.parse("application/json"),
                        "{\"location_id\":\"$locationID\"}"
                    )
                ).addHeader("authorization", token).build()
                val response = client.newCall(request)
                response.enqueue(object : okhttp3.Callback {
                    override fun onFailure(call: okhttp3.Call, e: java.io.IOException) {
                        println("Error: $e")
                    }

                    override fun onResponse(call: okhttp3.Call, response: okhttp3.Response) {
                        val responseBody: String? = response.body()?.string()
                        if (responseBody != null) {
                            if (responseBody == "[]") {
                                return
                            }
                            var messages = responseBody.split("}")
                            if (responseBody.split(",[{\"_buf\"").isNotEmpty()) {
                                val temp = responseBody.split(",[{\"_buf\"")[0]
                                messages = temp.split("}")
                            }
                            for (message in messages) {
                                if (message.split("message").size > 1) {
                                    val messageTest =
                                        message.split("message")[1].split(":")[1].replace(
                                            "\"", ""
                                        )
                                    runOnUiThread {
                                        messageList.add(Messages("", messageTest))
                                    }
                                }
                            }
                            runOnUiThread {
                                messageAdapter?.notifyDataSetChanged()
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


    private fun redirectLogin() {
        startActivity(Intent(this, MainActivity::class.java))
    }


    private fun sendMessage() {

        val sharedPref = getSharedPreferences("user", MODE_PRIVATE)
        val token = sharedPref.getString("token", null)
        val message = this.messageInput.text.toString()
        this.messageInput.text.clear()
        val locationID = sharedPref.getString("locationOccupationId", null)
        if (token != null) {
            val apiPath = "http://10.66.125.162:3001/location/add-message"
            try {
                val request = okhttp3.Request.Builder().url(apiPath).post(
                    okhttp3.RequestBody.create(
                        okhttp3.MediaType.parse("application/json"),
                        "{\"location_occupation_id\":\"$locationID\",\"message\":\"$message\"}"
                    )
                ).addHeader("authorization", token).build()
                val response = client.newCall(request)
                response.enqueue(object : okhttp3.Callback {
                    override fun onFailure(call: okhttp3.Call, e: java.io.IOException) {
                        println("Error: $e")
                    }

                    override fun onResponse(call: okhttp3.Call, response: okhttp3.Response) {
                        runOnUiThread {
                            messageList.add(Messages("You", message))
                            messageAdapter?.notifyDataSetChanged()
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


    private fun fetchServices() {
        val sharedPref = getSharedPreferences("user", MODE_PRIVATE)
        val token = sharedPref.getString("token", null)
        val locationOccupationId = sharedPref.getString("locationOccupationId", null)
        val locationID = sharedPref.getString("locationID", null)
        if (token != null) {
            val apiPath = "http://10.66.125.162:3001/service/get-service-by-user"
            try {
                val request = okhttp3.Request.Builder().url(apiPath).post(
                    okhttp3.RequestBody.create(
                        okhttp3.MediaType.parse("application/json"),
                        "{\"location_id\":\"$locationID\",\"location_occupation_id\":\"$locationOccupationId\"}"
                    )
                ).addHeader("authorization", token).build()
                val response = client.newCall(request)
                response.enqueue(object : okhttp3.Callback {
                    override fun onFailure(call: okhttp3.Call, e: java.io.IOException) {
                        println("Error: $e")
                    }

                    override fun onResponse(call: okhttp3.Call, response: okhttp3.Response) {
                        runOnUiThread {

                            val responseBody = response.body()?.string()

                            if (responseBody != null) {
                                if (responseBody == "[]") {
                                    return@runOnUiThread
                                }
                                val services = responseBody.split("},{\"id").ifEmpty {
                                    arrayOf(responseBody).toList()
                                }
                                for (service in services) {
                                    val name =
                                        service.split("name")[1].split(":")[1].split(",")[0].replace(
                                            "\"", ""
                                        )
                                    val price =
                                        service.split("price")[1].split(":")[1].split(',')[0].replace(
                                            "\"", ""
                                        )
                                    runOnUiThread {
                                        cardList.add(
                                            Card(
                                                name, price, "Image", "", "", 0, 0
                                            )
                                        )
                                    }
                                }
                                for (card in cardList) {
                                    fetchImage(card)
                                }
                                runOnUiThread {
                                    arrayAdapter?.notifyDataSetChanged()
                                }
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

    private fun fetchImage(card: Card) {
        val sharedPref = getSharedPreferences("user", AppCompatActivity.MODE_PRIVATE)
        val token = sharedPref.getString("token", null)
        if (token != null) {
            val apiPath = "http://10.66.125.162:3001/picture/service-${card.getId()}"
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
                        runOnUiThread {
                            card.setImages(responseBody)
                        }
                    }
                })
            } catch (e: Exception) {
                println("Error: $e")
            }
        }
    }

}