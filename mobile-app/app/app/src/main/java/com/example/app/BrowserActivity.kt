package com.example.app

import android.os.Bundle
import android.webkit.WebView
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class BrowserActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_browser)

        val myWebView: WebView = findViewById(R.id.webview)
        myWebView.loadUrl("http://pcs.c2smr.fr/")

        val backHome = findViewById<Button>(R.id.backHome)
        backHome.setOnClickListener {
            finish()
        }

    }
}