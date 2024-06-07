package com.example.app

import android.os.Bundle
import android.webkit.WebView
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class BrowserActivity : AppCompatActivity() {

    private var url: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_browser)
        url = intent.getStringExtra("url").toString()

        val myWebView: WebView = findViewById(R.id.webview)
        myWebView.loadUrl(url)

        val backHome = findViewById<Button>(R.id.backHome)
        backHome.setOnClickListener {
            finish()
        }

    }
}