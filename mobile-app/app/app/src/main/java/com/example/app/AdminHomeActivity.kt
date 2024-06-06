package com.example.app

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.ListView
import okhttp3.OkHttpClient

class AdminHomeActivity : AppCompatActivity() {

    private val client = OkHttpClient()
    private lateinit var arrayAdapter: CardAdapter
    private val serviceList = mutableListOf<Card>()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_admin_home)


        val logoutButton = findViewById<Button>(R.id.logout)
        logoutButton.setOnClickListener {
            logout()
        }

        val listView = findViewById<ListView>(R.id.listView)
        arrayAdapter = CardAdapter(this, serviceList)
        listView.adapter = arrayAdapter

        listView.setOnItemClickListener { parent, view, position, id ->
            var intent = Intent(this, NFCConciergeActivity::class.java)
            intent.putExtra("nfc", serviceList[position].getDescription())
            startActivity(intent)
        }

        fetchService()

    }


    private fun logout() {
        val sharedPref = getSharedPreferences("user", MODE_PRIVATE)
        with(sharedPref.edit()) {
            remove("token")
            commit()
        }
        finish()
    }


    private fun fetchService() {
        val sharedPref = getSharedPreferences("user", MODE_PRIVATE)
        val token = sharedPref.getString("token", null)
        if (token != null) {
            val apiPath = "https://apipcs.c2smr.fr/service"
            try {
                val request = okhttp3.Request.Builder().url(apiPath).get(
                ).addHeader("authorization", token).build()
                val response = client.newCall(request)
                response.enqueue(object : okhttp3.Callback {
                    override fun onFailure(call: okhttp3.Call, e: java.io.IOException) {
                        println("Error: $e")
                    }

                    override fun onResponse(call: okhttp3.Call, response: okhttp3.Response) {
                        val responseBody: String? = response.body()?.string()
                        println(responseBody)
                        if (responseBody != null) {
                            if (responseBody == "[]") {
                                return
                            }
                            val services = responseBody.split("},{\"id").ifEmpty {
                                arrayOf(responseBody).toList()
                            }
                            services.dropLast(1)
                            for (service in services) {
                                val id =
                                    service.split("id")[1].split(":")[1].split(',')[0].replace(
                                        "\"", ""
                                    )
                                val name =
                                    service.split("name")[1].split(":")[1].split(",")[0].replace(
                                        "\"", ""
                                    )
                                val type =
                                    service.split("type")[1].split(":")[1].split(',')[0].replace(
                                        "\"", ""
                                    )
                                val nfc =
                                    service.split("nfc")[1].split(":")[1].split(
                                        ','
                                    )[0].replace(
                                        "\"", ""
                                    )

                                runOnUiThread {
                                    serviceList.add(
                                        Card(
                                            name,
                                            type,
                                            "Image",
                                            nfc,
                                            "",
                                            id.toInt(),
                                            id.toInt()
                                        )
                                    )
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
            finish()
        }
    }
}