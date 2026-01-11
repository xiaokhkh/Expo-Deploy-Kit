require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  pod_name = package['name'].gsub('@', '').gsub('/', '-')
  s.name = pod_name
  s.version = package['version']
  s.summary = package['description']
  s.description = package['description']
  s.homepage = package['homepage']
  s.license = package['license']
  s.author = package['author']
  s.platforms = { :ios => '13.0' }
  s.source = { :git => package['repository']['url'], :tag => s.version.to_s }
  s.source_files = 'ios/**/*.{h,m,mm,swift}'
  s.dependency 'ExpoModulesCore'
end
