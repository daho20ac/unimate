import { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import firebase from 'firebase/compat';
import 'firebase/storage'

//Components
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import WelcomePage from './components/pages/WelcomePage';
import FindMentor from './components/pages/FindMentor';
import BecomeMentor from './components/pages/BecomeMentor';
import StackNavigation from './components/navigation/StackNavigator';
import MyBookings from './components/pages/MyBookings';
import BookingStack from './components/navigation/BookingStack'; 



import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA7FTH79DX3vqQZQOgTV6wxPTIrfeD4qCk",
  authDomain: "godkendelse1-97106.firebaseapp.com",
  databaseURL: "https://godkendelse1-97106-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "godkendelse1-97106",
  storageBucket: "godkendelse1-97106.appspot.com",
  messagingSenderId: "973563290322",
  appId: "1:973563290322:web:6adc719f89b3c32db6430b"
};



//Der oprettes en tab navigator
const Tab = createBottomTabNavigator()


//Logik der for når man er logget ind eller ud.
function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log("The user is logged");

      callback({loggedIn: true, email: user.email})
    } else {
      console.log("The user is not logged");
      callback({loggedIn: false})
    }
  });
}

export default function App() {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

    //UseState bruges til at angive om en bruger er logget ind eller ej.
    const [user, setUser] = useState({loggedIn: false, email: null})



    useEffect(() => {
      const unsubscribe = onAuthStateChange(setUser);
      return () => {
        unsubscribe();
      };
    }, []);


    //Hvis burugeren IKKE er logget ind så præsenteres den for en bottomnavigator med to pages til signUp og Login
    if(user.loggedIn == false) {
      return (
        <NavigationContainer>
          <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen options={{
              tabBarIcon: ({focused}) => {
                return (
                  <Image style={styles.icon} source={require('./assets/Login.png')}/>
                )
              }
            }} name={"Login"} component={LoginForm} />
            <Tab.Screen
            options={{
              tabBarIcon: ({focused}) => {
                return (
                  <Image style={styles.icon} source={require('./assets/SignUp.png')}/>
                )
              }
            }} name={"Sign up"} component={SignUpForm} />
          </Tab.Navigator>
        </NavigationContainer>
    );
    } else {
      //Hvis brugere er logget ind præsenteres den for 4 forskellige tabs: Welcome, FindMentor, Become a mentor og MyBookings.
      return (
        <NavigationContainer>
          <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen options={{
              tabBarIcon: ({focused}) => {
                return (
                  <Image style={styles.icon} source={require('./assets/Home.png')}/>
                )
              }
            }} name={"Welcome"} component={WelcomePage}/>
            <Tab.Screen
            options={{
              tabBarIcon: ({focused}) => {
                return (
                  <Image style={styles.icon} source={require('./assets/FindMentor.png')}/>
                )
              }
            }} name={"Find Mentor"} component={StackNavigation}/>
            <Tab.Screen 
            options={{
              tabBarIcon: ({focused}) => {
                return (
                  <Image style={styles.icon} source={require('./assets/Mentor.png')}/>
                )
              }
            }}name={"Become a Mentor"} component={BecomeMentor} />
            <Tab.Screen 
            options={{
              tabBarIcon: ({focused}) => {
                return (
                  <Image style={styles.icon} source={require('./assets/Bookings.png')}/>
                )
              }
            }}name={"Bookings"} component={BookingStack} />
          </Tab.Navigator>
        </NavigationContainer>
    
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 25,
    width: 25
  }
});
