import {Text, View } from 'react-native';
import * as React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import FindMentor from '../pages/FindMentor';
import MentorDetails from '../pages/MentorDetails';

const Stack = createStackNavigator()

//Husk at ændre navn
function StackNavigation() {
    return (
      <Stack.Navigator>
        <Stack.Screen name={'Mentor List'} component={FindMentor} />
        <Stack.Screen name={'Mentor Details'} component={MentorDetails} />
      </Stack.Navigator>
      
    )
  }

  export default StackNavigation