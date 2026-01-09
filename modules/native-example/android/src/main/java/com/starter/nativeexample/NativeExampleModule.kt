package com.starter.nativeexample

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class NativeExampleModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("NativeExample")

    Constants(
      "pi" to Math.PI
    )

    Function("hello") { name: String ->
      "Hello $name"
    }
  }
}
