//
//  RCTCustomSpan.m
//  secondApp
//
//  Created by Shraddha Hattimare on 27/04/22.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CustomSpan, NSObject)
RCT_EXTERN_METHOD(increment)
RCT_EXTERN_METHOD(createCustomSpan:)
RCT_EXTERN_METHOD(createCrashSpan:)
@end
