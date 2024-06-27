package com.example.app

import android.annotation.SuppressLint
import android.app.PendingIntent
import android.content.Intent
import android.content.IntentFilter
import android.nfc.NdefMessage
import android.nfc.NdefRecord
import android.nfc.NfcAdapter
import android.nfc.Tag
import android.nfc.tech.Ndef
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody
import okhttp3.MediaType
import okhttp3.Callback
import okhttp3.Call
import okhttp3.Response
import java.io.IOException

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

        val backButton = findViewById<Button>(R.id.backHome)
        backButton.setOnClickListener {
            intent = Intent(this, HomeActivity::class.java)
            startActivity(intent)
            finish()
        }

        val buttonToAnimate = findViewById<Button>(R.id.scanNFC)
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
        val pendingIntent = PendingIntent.getActivity(
            this, 0, Intent(this, javaClass).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP),
            PendingIntent.FLAG_IMMUTABLE
        )
        val intentFilters = arrayOf(
            IntentFilter(NfcAdapter.ACTION_NDEF_DISCOVERED),
            IntentFilter(NfcAdapter.ACTION_TAG_DISCOVERED),
            IntentFilter(NfcAdapter.ACTION_TECH_DISCOVERED)
        )
        nfcAdapter?.enableForegroundDispatch(this, pendingIntent, intentFilters, null)
    }

    override fun onPause() {
        super.onPause()
        nfcAdapter?.disableForegroundDispatch(this)
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        if (intent?.action == NfcAdapter.ACTION_TAG_DISCOVERED) {
            val tag = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                intent.getParcelableExtra(NfcAdapter.EXTRA_TAG, Tag::class.java)
            } else {
                intent.getParcelableExtra(NfcAdapter.EXTRA_TAG)
            }
            tag?.let {
                readNFC(it)
            }
        }
    }

    private fun readNFC(tag: Tag) {
        val ndef = Ndef.get(tag)
        ndef?.connect()
        val ndefMessage = ndef?.ndefMessage
        ndefMessage?.let {
            val message = String(it.records[0].payload)
            sendData(message)
        }
        ndef?.close()
    }

    private fun sendData(value: String) {
        println("NFC tag detected: $value")
        if (nfc != value) {
            return
        }
        val apiPath = "https://apipcs.c2smr.fr/service/service-is-here"
        val requestBody = RequestBody.create(
            MediaType.parse("application/json"),
            "{\"id\":\"$id\",\"nfc\":\"$nfc\",\"tag\":\"$value\"}"
        )
        val request = Request.Builder().url(apiPath).post(requestBody).build()
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                println("Error: $e")
            }

            override fun onResponse(call: Call, response: Response) {
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

    private fun ByteArray.toHexString(): String {
        val hexChars = "0123456789ABCDEF"
        val result = StringBuilder(size * 2)

        for (byte in this) {
            val value = byte.toInt()
            val hexChar1 = hexChars[value shr 4 and 0x0F]
            val hexChar2 = hexChars[value and 0x0F]
            result.append(hexChar1).append(hexChar2)
        }

        return result.toString()
    }
}
