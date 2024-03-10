package com.example.app

import android.annotation.SuppressLint
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import java.net.HttpURLConnection
import java.net.URL

class MainActivity : AppCompatActivity() {

    private lateinit var emailValue: EditText
    private lateinit var passwordValue: EditText
    private lateinit var button: Button

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        this.emailValue = findViewById(R.id.editTextTextEmailAddress)
        this.passwordValue = findViewById(R.id.editTextNumberPassword)
        this.button = findViewById(R.id.buttonSign)

        button.setOnClickListener() {
            val email = emailValue.text.toString()
            val password = passwordValue.text.toString()
            testConnection(email, password)
        }
    }

    private fun testConnection(email: String, password: String) {
        val apiPath = "http://localhost:3000/api/v1/auth/sign_in"
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


    }

}