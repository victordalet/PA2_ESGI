package com.example.app

import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import java.net.HttpURLConnection
import java.net.URL

class MainActivity : AppCompatActivity() {

    private lateinit var email: EditText
    private lateinit var password: EditText
    private lateinit var loginButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        this.password = findViewById(R.id.password)
        this.email = findViewById(R.id.email)
        this.loginButton = findViewById(R.id.loginButton)
        this.loginButton.setOnClickListener(View.OnClickListener {
            val apiPath = "http://127.0.0.1:3001/api/v1/auth/sign_in"
            try {
                val url = URL(apiPath)
                with(url.openConnection() as HttpURLConnection) {
                    requestMethod = "POST"
                    setRequestProperty("Content-Type", "application/json; utf-8")
                    setRequestProperty("Accept", "application/json")
                    doOutput = true
                    val jsonInputString = "{\"email\": \"$email\", \"password\": \"$password\"}"
                    outputStream.write(jsonInputString.toByteArray(Charsets.UTF_8))
                    println("Response code: $responseCode")
                    println("Response message: $responseMessage")
                }
            } catch (e: Exception) {
                println(e)
            }
        })
    }
}