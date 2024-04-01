package com.example.app


import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import okhttp3.OkHttpClient


class MainActivity : AppCompatActivity() {

    private lateinit var email: EditText
    private lateinit var password: EditText
    private lateinit var loginButton: Button
    private val client = OkHttpClient()


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        this.password = findViewById(R.id.password)
        this.email = findViewById(R.id.email)
        this.loginButton = findViewById(R.id.loginButton)
        this.loginButton.setOnClickListener(View.OnClickListener {
            val apiPath = "http://10.66.125.162:3001/user/connection"
            try {

                val emailValue = this.email.text.toString()
                val passwordValue = this.password.text.toString()

                val request = okhttp3.Request.Builder().url(apiPath).post(
                    okhttp3.RequestBody.create(
                        okhttp3.MediaType.parse("application/json"),
                        "{\"email\":\"$emailValue\",\"password\":\"$passwordValue\"}"
                    )
                ).build()
                val response = client.newCall(request)
                response.enqueue(object : okhttp3.Callback {
                    override fun onFailure(call: okhttp3.Call, e: java.io.IOException) {
                        println("Error: $e")
                    }

                    override fun onResponse(call: okhttp3.Call, response: okhttp3.Response) {
                        val responseBody: String? = response.body()?.string()
                        if (responseBody == "{\"connection\":null}") {
                            runOnUiThread {
                                createError()
                            }
                        } else {
                            val sharedPref = getSharedPreferences("user", MODE_PRIVATE)
                            with(sharedPref.edit()) {
                                if (responseBody != null) {
                                    putString(
                                        "token",
                                        responseBody.split(":")[1].split("}")[0].replace("\"", "")
                                    )
                                    putBoolean("isConnected", true)
                                    apply()
                                    val intent = android.content.Intent(
                                        this@MainActivity,
                                        HomeActivity::class.java
                                    )
                                    startActivity(intent)
                                }
                            }
                        }
                    }
                })
            } catch (e: Exception) {
                println("Error: $e")
                createError();
            }
        })
    }

    private fun createError() {
        Toast.makeText(this, "Login Failed!", Toast.LENGTH_SHORT).show()
    }
}

