//
//  RCTCustomSpan.swift
//  secondApp
//
//  Created by Shraddha Hattimare on 27/04/22.
//

import Foundation
//import SplunkOtel
//import SplunkOtelCrashReporting
import OpenTelemetryApi;
import OpenTelemetrySdk;

@objc(CustomSpan)
class CustomSpan: NSObject {
  private var count = 0
    @objc
    func increment() {
      count += 1
      print("count is \(count)")
      let tracer = OpenTelemetrySDK.instance.tracerProvider.get(instrumentationName: "SecondApp")
      let span = tracer.spanBuilder(spanName: "customSpan").startSpan()
      //span.setAttribute(key: "numClaims", value: claims.count)
      span.end() // or use defer for this
    }
  
  @objc func createCustomSpan(_ name: String)->Void {  //(name: String)->Void
    print("New custom span is created.")
     let tracer = OpenTelemetrySDK.instance.tracerProvider.get(instrumentationName: "SecondApp")
     let span = tracer.spanBuilder(spanName: name).startSpan()
     //span.setAttribute(key: "numClaims", value: claims.count)
     span.end() // or use defer for this
  }
 
  @objc public  class func createCrashSpan(_ crashInfo: AnyObject)->Void {
    print("Crash span is created.")
    let now = Date()
    let tracer = OpenTelemetrySDK.instance.tracerProvider.get(instrumentationName: "splunk-ios-crashreporting")
    let span = tracer.spanBuilder(spanName: "RNCrash").startSpan()
   /* for (key,value) in crashInfo {
        print("\(key) = \(value)")
        span.setAttribute(key: key, value: value)
    }*/
    span.setAttribute(key: "component", value: "crash")
    span.setAttribute(key: "error", value: true)
    span.setAttribute(key: "exception.stacktrace", value: "")
    span.end(time: now) 
  }
}


