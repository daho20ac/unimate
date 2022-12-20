import { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase/compat';
import 'firebase/storage'

//Components
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import WelcomePage from './components/pages/WelcomePage';
import InformationPage from './components/pages/InformationPage';
import FindMentor from './components/pages/FindMentor';
import BecomeMentor from './components/pages/BecomeMentor';


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




const Tab = createBottomTabNavigator()

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

    if(user.loggedIn == false) {
      return (
        <NavigationContainer>
          <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name={"Login"} component={LoginForm} />
            <Tab.Screen name={"Sign up"} component={SignUpForm} />
          </Tab.Navigator>
        </NavigationContainer>
    );
    } else {
      return (
        <NavigationContainer>
          <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name={"Information"} component={InformationPage} />
            <Tab.Screen name={"Find Mentor"} component={FindMentor}/>
            <Tab.Screen name={"Welcome"} component={WelcomePage}/>
            <Tab.Screen name={"Become a Mentor"} component={BecomeMentor} />
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
});
