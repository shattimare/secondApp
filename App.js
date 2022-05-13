/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// way 1
/*import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
  NativeModules,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';
import { multiply ,RUM, rumInitalization} from "react-native-awesome-module";
import RNSplunkRum from './RNSplunkRum';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  //var CalendarManager = NativeModules.CalendarManager;
  const SR = NativeModules.SplunkRum;

  const result =  multiply(3, 7);
  const handleClicked = () => {
    console.log("button clicked occures....");
    console.log(SR);
    //console.log(SR.getConstants);
    
   
   //console.log(multiply(3, 7))
   //console.log(rumInitalization)
   //console.log(RUM)
   console.log(SR.rumInitalization)
   SR.rumInitalization()
   // console.log(CalendarManager.addEvent('Birthday Party',
    //'4 Privet Drive, Surrey'))
    //SR.testModule('Some String !')
    
  /* NativeModules.SplunkRum.getDeviceName((err ,name) => {
      console.log(err, name);
   });*/
 /* };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
        </View>
        <View style = {styles.container}>
         <TouchableOpacity onPress={ handleClicked }>
            <Text style = {styles.text}>
               Click here..
            </Text>
         </TouchableOpacity>
      </View>
      <View style = {styles.container}>
          <Text style = {styles.sectionTitle}>
            Hello World...
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default App;

const styles = StyleSheet.create ({
   container: {
      alignItems: 'center',
   },
   text: {
      borderWidth: 1,
      padding: 25,
      borderColor: 'black',
      backgroundColor: 'red'
   },
   sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
})*/


//way 2
/*import React from 'react'
import {Button, SafeAreaView} from 'react-native';
import RNShare from './RNShare';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button
        title="Share"
        onPress={() => RNShare.open({message: 'Bridge with Swift Dev.to Tutorial'})}
      />
    </SafeAreaView>
  );
};
export default App;*/

// navigation screen
import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
  NativeModules,
  Button,
  LogBox
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CrashTester from 'react-native-crash-tester';
import RNCrashIt from 'react-native-crashit';
import { executeNativeBackPress } from 'react-native-screens';
//import { ErrorBoundary } from "react-error-boundary";
import {setJSExceptionHandler, getJSExceptionHandler} from 'react-native-exception-handler';


const SR = NativeModules.SplunkRum;
const newspan = NativeModules.CustomSpan;
const Stack = createNativeStackNavigator();

const handleError = (error, isFatal) => {
  console.log(error,isFatal);
  alert(error.name);
  SR.raiseCrash(error)
 // newspan.createCrashSpan(error);
};
setJSExceptionHandler((error, isFatal) => {
  console.log('caught global error');
  handleError(error,isFatal);
 
}, true);

const App = () => {
  return (
    <NavigationContainer onReady={() => {
      SR.rumInitalization();
      LogBox.ignoreAllLogs(true);//Ignore all log notifications
      console.error = (error) => error.apply;
    }}>
     <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen1}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Exception" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    

  );

  
};

const ErrorComponent = () => {
  return <Text>Something went wrong</Text>;
};





const HomeScreen1 = ({ navigation }) => {
  return(
    <View>
    <Text style={styles.title}>
      The title and onPress handler are required. It is recommended to set accessibilityLabel to help make your app usable by everyone.
    </Text>
    <Button
      title="Crash"
      onPress={() => 
       { 
        // SR.crashIt();}
        //backhandler.exitapp()}  //android only
        //exit(0)
        
        /*var error = new Error("custome error");
        var dictionary = {};
        dictionary["stack"] = error.stack;
        dictionary["name"] = error.name;
        dictionary["message"] = error.message;
        SR.raiseError(dictionary);}*/
       // throw new Error('This is a test javascript crash!');}
      // CrashTester.jsCrash(); }
       //NativeModules.DevSettings.setIsDebuggingRemotely(true);
       //RNCrashIt.crash();}
       //SR.raiseTestNativeError();}
        /*const test = {};
        console.log(test.should.crash); }*/

        fetch('asdf')
        .then((res) => res.json())
        .then(res => { alert(res); })
        .catch(error => {handleError(error,false);}); }
        
      }
    />
    <Button
      title="Exception"
      onPress={() => 
       { 
        try {
          var test;
          test.color; //This will generate a TypeError: undefined
        }
        catch (error){
          console.log(error)
          //SR.raiseException(error)
         SR.raiseException(error.message) //error.name
        }
       
       }
      }
    />
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', { name: 'Jane' })
      }
    />
    <Button
      title="Custom Span"
      onPress={() => 
        { console.log("inside custome span")
        console.log(newspan)
       newspan.increment()
       newspan.createCustomSpan("krishna")
      }
      }
    />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', { name: 'Jane' })
      }
    />
  );
};

const ProfileScreen = ({ navigation, route }) => {
  //return <Text>This is {route.params.name}'s profile</Text>;
  return (
    <><Text>This is {route.params.name}'s profile</Text><Button
      title="Go to Error"
      onPress={() => navigation.navigate('Exception', { name: 'Jane' })} /></>
  );
};
export default App;