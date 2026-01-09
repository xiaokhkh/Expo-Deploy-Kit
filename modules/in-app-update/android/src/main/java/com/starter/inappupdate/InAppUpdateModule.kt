package com.starter.inappupdate

import android.app.DownloadManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.Uri
import android.os.Build
import android.provider.Settings
import com.google.android.play.core.appupdate.AppUpdateManagerFactory
import com.google.android.play.core.install.model.AppUpdateType
import com.google.android.play.core.install.model.UpdateAvailability
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class InAppUpdateModule : Module() {
  private var pendingDownloadId: Long? = null
  private var receiverRegistered = false
  private val playUpdateRequestCode = 1108

  private val downloadReceiver = object : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
      if (DownloadManager.ACTION_DOWNLOAD_COMPLETE != intent.action) {
        return
      }

      val downloadId = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1)
      if (downloadId == -1L || downloadId != pendingDownloadId) {
        return
      }

      val manager = context.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
      val fileUri = manager.getUriForDownloadedFile(downloadId) ?: return

      val installIntent = Intent(Intent.ACTION_VIEW).apply {
        setDataAndType(fileUri, "application/vnd.android.package-archive")
        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
      }

      context.startActivity(installIntent)
    }
  }

  override fun definition() = ModuleDefinition {
    Name("InAppUpdate")

    OnCreate {
      val context = appContext.reactContext ?: return@OnCreate
      if (!receiverRegistered) {
        context.registerReceiver(downloadReceiver, IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE))
        receiverRegistered = true
      }
    }

    OnDestroy {
      val context = appContext.reactContext ?: return@OnDestroy
      if (receiverRegistered) {
        context.unregisterReceiver(downloadReceiver)
        receiverRegistered = false
      }
    }

    AsyncFunction("startUpdate") { apkUrl: String ->
      val context = appContext.reactContext ?: throw IllegalStateException("React context not available.")
      val uri = Uri.parse(apkUrl)
      val request = DownloadManager.Request(uri)
        .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
        .setDestinationInExternalFilesDir(context, android.os.Environment.DIRECTORY_DOWNLOADS, "app-update.apk")

      val manager = context.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
      val downloadId = manager.enqueue(request)
      pendingDownloadId = downloadId

      downloadId.toString()
    }

    AsyncFunction("isInstallPermissionGranted") {
      val context = appContext.reactContext ?: throw IllegalStateException("React context not available.")
      if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
        true
      } else {
        context.packageManager.canRequestPackageInstalls()
      }
    }

    Function("openInstallPermissionSettings") {
      val context = appContext.reactContext ?: return@Function
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        val intent = Intent(
          Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
          Uri.parse("package:${context.packageName}")
        ).apply {
          addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }

        context.startActivity(intent)
      }
    }

    AsyncFunction("checkPlayUpdate") { promise: Promise ->
      val context = appContext.reactContext
      if (context == null) {
        promise.reject("ERR_PLAY_UPDATE_CONTEXT", "React context not available.", null)
        return@AsyncFunction
      }

      val manager = AppUpdateManagerFactory.create(context)
      manager.appUpdateInfo
        .addOnSuccessListener { info ->
          val availability = info.updateAvailability()
          promise.resolve(
            mapOf(
              "available" to (availability == UpdateAvailability.UPDATE_AVAILABLE),
              "availability" to availability,
              "immediateAllowed" to info.isUpdateTypeAllowed(AppUpdateType.IMMEDIATE),
              "flexibleAllowed" to info.isUpdateTypeAllowed(AppUpdateType.FLEXIBLE),
              "availableVersionCode" to info.availableVersionCode(),
              "packageName" to info.packageName()
            )
          )
        }
        .addOnFailureListener { error ->
          promise.reject("ERR_PLAY_UPDATE_CHECK", error)
        }
    }

    AsyncFunction("startPlayUpdate") { mode: String, promise: Promise ->
      val context = appContext.reactContext
      val activity = appContext.currentActivity
      if (context == null || activity == null) {
        promise.reject("ERR_PLAY_UPDATE_ACTIVITY", "Activity not available.", null)
        return@AsyncFunction
      }

      val manager = AppUpdateManagerFactory.create(context)
      manager.appUpdateInfo
        .addOnSuccessListener { info ->
          val updateType = if (mode == "flexible") AppUpdateType.FLEXIBLE else AppUpdateType.IMMEDIATE
          val available = info.updateAvailability() == UpdateAvailability.UPDATE_AVAILABLE
          val allowed = info.isUpdateTypeAllowed(updateType)

          if (!available || !allowed) {
            promise.reject("ERR_PLAY_UPDATE_NOT_ALLOWED", "Update not available or allowed.", null)
            return@addOnSuccessListener
          }

          try {
            manager.startUpdateFlowForResult(info, updateType, activity, playUpdateRequestCode)
            promise.resolve("started")
          } catch (error: Exception) {
            promise.reject("ERR_PLAY_UPDATE_START", error)
          }
        }
        .addOnFailureListener { error ->
          promise.reject("ERR_PLAY_UPDATE_CHECK", error)
        }
    }
  }
}
