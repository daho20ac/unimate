import {Text, View } from 'react-native';
import * as React from "react";
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator()

//Husk at ændre navn
export default function App() {
    return (
        <Stack.Navigator>
            <Stack.Screen />
            <Stack.Screen />
        </Stack.Navigator>
    );
}