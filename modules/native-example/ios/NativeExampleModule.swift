import ExpoModulesCore

public class NativeExampleModule: Module {
  public func definition() -> ModuleDefinition {
    Name("NativeExample")

    Constants([
      "pi": Double.pi
    ])

    Function("hello") { (name: String) in
      return "Hello \(name)"
    }
  }
}
