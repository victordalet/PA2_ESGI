package com.example.app

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class NFCConciergeActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_nfcconcierge)


        var backButton = findViewById<Button>(R.id.backHome)
        backButton.setOnClickListener {
            intent = Intent(this, HomeActivity::class.java)
            startActivity(intent)
        }

        var buttonToAnimate = findViewById<Button>(R.id.scanNFC)
        buttonToAnimate.animate().apply {
            duration = 1000
            rotationYBy(360f)
            rotationXBy(360f)
            scaleXBy(1f)
            scaleYBy(1f)
        }.start()


    }
}