import {Text, View } from 'react-native';
import * as React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import MyBookings from '../pages/MyBookings';
import BookingDetails from '../pages/BookingDetails';

const Stack = createStackNavigator()

//Husk at ændre navn
function BookingStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name={'My Bookings'} component={MyBookings} />
        <Stack.Screen name={'Booking Details'} component={BookingDetails} />
      </Stack.Navigator>
      
    )
  }

  export default BookingStack