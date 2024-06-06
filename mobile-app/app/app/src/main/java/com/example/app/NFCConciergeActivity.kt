package com.example.app

import android.app.PendingIntent
import android.content.Intent
import android.content.IntentFilter
import android.nfc.NdefMessage
import android.nfc.NdefRecord
import android.nfc.NfcAdapter
import android.nfc.Tag
import android.nfc.tech.Ndef
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class NFCConciergeActivity : AppCompatActivity() {

    private var nfcAdapter: NfcAdapter? = null
    private var nfc_string: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_nfcconcierge)

        nfcAdapter = NfcAdapter.getDefaultAdapter(this)

        nfc_string = intent.getStringExtra("nfc").toString()
        println(nfc_string)

        val backButton = findViewById<Button>(R.id.backHome)
        backButton.setOnClickListener {
            intent = Intent(this, HomeActivity::class.java)
            startActivity(intent)
            finish()
        }

        val buttonToAnimate = findViewById<Button>(R.id.scanNFC)
        buttonToAnimate.setOnClickListener {
            Toast.makeText(this, "Place the NFC tag close to the device to scan.", Toast.LENGTH_SHORT).show()
        }
        buttonToAnimate.animate().apply {
            duration = 1000
            scaleXBy(1f)
            scaleYBy(1f)
        }.start()

    }

    override fun onResume() {
        super.onResume()
        val pendingIntent = PendingIntent.getActivity(
            this, 0, Intent(this, javaClass).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP),
            PendingIntent.FLAG_MUTABLE
        )
        val intentFilters = arrayOf(
            IntentFilter(NfcAdapter.ACTION_NDEF_DISCOVERED),
            IntentFilter(NfcAdapter.ACTION_TAG_DISCOVERED)
        )
        nfcAdapter?.enableForegroundDispatch(this, pendingIntent, intentFilters, null)
        Log.d("NFCConciergeActivity", "Foreground dispatch enabled") // C'est Pour voir si ça fonctionne bien dans les LOG
    }

    override fun onPause() {
        super.onPause()
        nfcAdapter?.disableForegroundDispatch(this)
        Log.d("NFCConciergeActivity", "Foreground dispatch disabled")
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        Log.d("NFCConciergeActivity", "New intent received: ${intent?.action}")
        if (intent?.action == NfcAdapter.ACTION_TAG_DISCOVERED) {
            val tag = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                intent.getParcelableExtra(NfcAdapter.EXTRA_TAG, Tag::class.java)
            } else {
                intent.getParcelableExtra(NfcAdapter.EXTRA_TAG)
            }
            tag?.let {
                Log.d("NFCConciergeActivity", "NFC tag discovered with ID: ${tag.id.toHexString()}")
                writeNFC(it, nfc_string)
            }
        }
    }

    private fun writeNFC(tag: Tag, message: String) {
        Log.d("NFCConciergeActivity", "Writing to NFC tag: $message")
        val ndef = Ndef.get(tag)
        ndef.connect()
        val ndefMessage = NdefMessage(
            arrayOf(
                NdefRecord.createMime(nfc_string, message.toByteArray())
            )
        )
        ndef.writeNdefMessage(ndefMessage)
        Toast.makeText(this, "Message written to NFC tag!", Toast.LENGTH_SHORT).show()
        Log.d("NFCConciergeActivity", "Message written to NFC tag")
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
