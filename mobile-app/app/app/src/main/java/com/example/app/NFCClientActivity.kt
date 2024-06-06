package com.example.app

import android.annotation.SuppressLint
import android.app.PendingIntent
import android.content.Intent
import android.content.IntentFilter
import android.nfc.NfcAdapter
import android.nfc.Tag
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import okhttp3.OkHttpClient

class NFCClientActivity : AppCompatActivity() {

    private val client = OkHttpClient()
    private var nfcAdapter: NfcAdapter? = null
    private var id: String = ""
    private var nfc: String = ""


    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_nfcclient)


        id = intent.getStringExtra("id").toString()
        nfc = intent.getStringExtra("nfc").toString()

        var backButton = findViewById<Button>(R.id.backHome)
        backButton.setOnClickListener {
            intent = Intent(this, HomeActivity::class.java)
            startActivity(intent)
        }

        var buttonToAnimate = findViewById<Button>(R.id.scanNFC)
        buttonToAnimate.animate().apply {
            duration = 1000
            scaleXBy(1f)
            scaleYBy(1f)
        }.start()


        nfcAdapter = NfcAdapter.getDefaultAdapter(this)

    }


    private fun createNFCIntentFilter(): Array<IntentFilter> {
        val intentFilter = IntentFilter(NfcAdapter.ACTION_NDEF_DISCOVERED)
        try {
            intentFilter.addDataType("*/*")
        } catch (e: IntentFilter.MalformedMimeTypeException) {
            throw RuntimeException("Failed to add MIME type.", e)
        }
        return arrayOf(intentFilter)
    }


    override fun onResume() {
        super.onResume()
        val nfcAdapter = NfcAdapter.getDefaultAdapter(this)
        val pendingIntent = PendingIntent.getActivity(
            this, 0, Intent(this, javaClass).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP),
            PendingIntent.FLAG_IMMUTABLE
        )
        val intentFilters = arrayOf<IntentFilter>(
            IntentFilter(NfcAdapter.ACTION_NDEF_DISCOVERED),
            IntentFilter(NfcAdapter.ACTION_TAG_DISCOVERED),
            IntentFilter(NfcAdapter.ACTION_TECH_DISCOVERED)
        )
        nfcAdapter.enableForegroundDispatch(this, pendingIntent, intentFilters, null)
    }

    override fun onPause() {
        super.onPause()
        val nfcAdapter = NfcAdapter.getDefaultAdapter(this)
        nfcAdapter.disableForegroundDispatch(this)
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        if (intent?.action == NfcAdapter.ACTION_TAG_DISCOVERED) {
            val tag = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                intent.getParcelableExtra(NfcAdapter.EXTRA_TAG, Tag::class.java)
            } else {
                intent.getParcelableExtra(NfcAdapter.EXTRA_TAG)
            }
            tag?.id?.let {
                val tagValue = it.toHexString()
                sendData(tagValue)
            }
        }
    }

    private fun sendData(value: String) {
        println("NFC tag detected: $value")
        if (nfc != value) {
            return
        }
        val apiPath = "https://apipcs.c2smr.fr/service/service-is-here"
        val request = okhttp3.Request.Builder().url(apiPath).post(
            okhttp3.RequestBody.create(
                okhttp3.MediaType.parse("application/json"),
                "{\"id\":\"$id\",\"nfc\":\"$nfc\",\"tag\":\"$value\"}"
            )
        ).build()
        val response = client.newCall(request)
        response.enqueue(object : okhttp3.Callback {
            override fun onFailure(call: okhttp3.Call, e: java.io.IOException) {
                println("Error: $e")
            }

            override fun onResponse(call: okhttp3.Call, response: okhttp3.Response) {
                val responseBody: String? = response.body()?.string()
                println("Response: $responseBody")
                runOnUiThread {
                    Toast.makeText(
                        applicationContext,
                        "Response: $responseBody",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
        })

    }

    fun ByteArray.toHexString(): String {
        val hexChars = "0123456789ABCDEF"
        val result = StringBuilder(size * 2)

        map { byte ->
            val value = byte.toInt()
            val hexChar1 = hexChars[value shr 4 and 0x0F]
            val hexChar2 = hexChars[value and 0x0F]
            result.append(hexChar1)
            result.append(hexChar2)
        }

        return result.toString()
    }


}