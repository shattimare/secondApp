//
//  RCTSplunkRum.h
//  secondApp
//
//  Created by Shraddha Hattimare on 18/04/22.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTSplunkRum : NSObject <RCTBridgeModule>
-(void)rumInitalization;
-(void)crashIt;
-(void)raiseException:(NSString*)errormsg;
//-(void)raiseException:(NSError*) error;
-(void)raiseTestNativeError;
-(void)raiseError:(id)errorInfo;
-(void)raiseCrash:(id)crashInfo;

@end

@interface RCT_EXTERN_MODULE(CustomSpan, NSObject)
RCT_EXTERN_METHOD(increment)
RCT_EXTERN_METHOD(createCustomSpan:)
RCT_EXTERN_METHOD(createCrashSpan:)
@end

NS_ASSUME_NONNULL_END
