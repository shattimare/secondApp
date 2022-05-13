//
//  RCTSplunkRum.m
//  secondApp
//
//  Created by Shraddha Hattimare on 18/04/22.
//

#import "RCTSplunkRum.h"
#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTLog.h>
#import <React/RCTErrorInfo.h>
//#import "secondApp-Swift.h"
@import SplunkOtel;
@import SplunkOtelCrashReporting;
@import OpenTelemetryApi;
@import OpenTelemetrySdk;


@implementation RCTSplunkRum

// To export a module named RCTSplunkRum
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getName){
  NSLog(@"Hello");
}

RCT_EXPORT_METHOD(getDeviceName:(RCTResponseSenderBlock)callback){
 @try{
   NSString *deviceName = [[UIDevice currentDevice] name];
   callback(@[[NSNull null], deviceName]);
 }
 @catch(NSException *exception){
   callback(@[exception.reason, [NSNull null]]);
 }
}

RCT_EXPORT_METHOD(testModule:(NSString *)string )
{
  RCTLogInfo(@"Splunk rum iniatization is done successfully...........");
  NSLog(@"The string '%@' comes from JavaScript! ", string);
 // [SplunkRum initializeWithBeaconUrl: @"https://rum-ingest.us0.signalfx.com/v1/rum" rumAuth: @"ABCD..." options: nil];
     
}

RCT_EXPORT_METHOD(rumInitalization){
  // Your beaconUrl and rumAuth will be provided by your friendly Splunk representative
    dispatch_async(dispatch_get_main_queue(), ^{
      SplunkRumOptions *options = [[SplunkRumOptions alloc] init];
      options.debug = true;
      options.allowInsecureBeacon = true;
      options.screenNameSpans = true;
      options.networkInstrumentation = true;
      
      [SplunkRum initializeWithBeaconUrl: @"https://rum-ingest.us0.signalfx.com/v1/rum" rumAuth: @"nF2sRwMTyB-is8WpcGQ72w" options:options ];
      [SplunkRumCrashReporting start];
    });
     RCTLogInfo(@"Splunk rum iniatization is done successfully...........");
  }
RCT_EXPORT_METHOD(crashIt){
  NSLog(@"crash coming...");
  int* p = 0;
  *p = 0;
}
/*RCT_EXPORT_METHOD(raiseException:(NSError*) error){
  NSLog(@"Exception...");
 // NSException *e;
 // [e raise];
  //[SplunkRum reportErrorWithString:@"oops"];
  RCTLogConvertError(error, error);
  [SplunkRum reportErrorWithError:error];
}*/
RCT_EXPORT_METHOD(raiseException:(NSString*)errormsg){
  NSLog(@"Exception...");
  [SplunkRum reportErrorWithString:errormsg];
}
RCT_EXPORT_METHOD(raiseTestNativeError) {
    NSLog(@"RAISING A TEST EXCEPTION");
    [NSException raise:@"TEST EXCEPTION" format:@"THIS IS A TEST EXCEPTION"];
}
RCT_EXPORT_METHOD(raiseError:(id)errorInfo){
  NSLog(@"%@", errorInfo); //@{@"Error reason": @"Invalid Input"}
  NSError *error = [NSError errorWithDomain:NSPOSIXErrorDomain code:200 userInfo:errorInfo];
  NSLog(@"%@",error);
  [SplunkRum reportErrorWithError:error];
}

RCT_EXPORT_METHOD(raiseCrash:(id)crashInfo){
  NSLog(@"%@", crashInfo); //@{@"Error reason": @"Invalid Input"}
  NSException *e = [NSException exceptionWithName:@"Crash" reason:@"Custom reason" userInfo:crashInfo];
  NSLog(@"%@",e);
  [SplunkRum reportErrorWithException:e];
 //[CustomSpan createCrashSpan:crashInfo];
  
 }
@end
