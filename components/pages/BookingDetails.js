import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, Button, Touchable, Platform} from 'react-native';
import firebase from 'firebase/compat';
import SignUpForm from '../SignUpForm'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

function BookingDetails ({route, navigation}) {

    const user = firebase.auth().currentUser


 
    const [startingTime, setStartingTime] = useState(new Date())
    const [endingTime, setEndingTIme] = useState(new Date())
    const [hours, setHours] = useState()
    const [minutes, setMinutes] = useState()
    const [price, setPrice] = useState()

    //Booking
    const [booking, setBooking] = useState({})


    useEffect(() => {
        
        delete route.params.booking.university

        setBooking(route.params.booking)

       return () => { setBooking({})}
    })
    if(!booking) {
        return (
            <Text>No booking was found</Text>
        )
    }
    
    if(user) {
        return (
            <View>
                {
            Object.entries(booking).map((item,index)=>{
                return(
                    <View key={index} style={styles.container}>
                        <Text>{item[0]}: </Text>
                        <Text >{item[1]}</Text>
                    </View>
                )
            })
        }
           
           <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Update Booking</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Delete Booking</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Contact Mentor</Text>
            </TouchableOpacity>

            </View>
        )
    } else {
        return (
            <SignUpForm />
        )
    }
}

export default BookingDetails

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '80%',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10
      },
      buttonText: {
        color: '#fff',
        fontSize: 18
      },
  });
