import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, Button, Touchable, Platform} from 'react-native';
import firebase from 'firebase/compat';
import SignUpForm from '../SignUpForm'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

function BookingDetails ({route, navigation}) {

    const user = firebase.auth().currentUser


    //Booking variable
    const [booking, setBooking] = useState({})


    //useEffect til at sætte booking variable = med den booking man trykkede på. 
    useEffect(() => {
        
        delete route.params.booking.university

        setBooking(route.params.booking)

       return () => { setBooking({})}
    })
    //Hvis der ikke er en booking
    if(!booking) {
        return (
            <Text>No booking was found</Text>
        )
    }
    //Der retuneres en side med information omkring den booking man trykkedepå
    //Der er update og delete booking, samt contact seller knapper, som dog ikke virker i nuværende i iteration.
    //Disse kan der arbejdes videre på i forbindelse med videreudvikling af programmet. 
    if(user) {
        return (
            
            <View style={styles.container}>
                <View style={styles.cardContainer}>

                <View style={styles.textContainer}>
           
                {
            Object.entries(booking).map((item,index)=>{
                return(
                    <View key={index} style={styles.inputContainer}>
                        <Text style={styles.label}>{item[0]}:</Text>
                        <Text>{item[1]}</Text>
                    </View>
                )
            })
        }
        </View>
           <View style={styles.buttonContainer}>
           <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Update Booking</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.buttonText}>Delete Booking</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Contact Mentor</Text>
            </TouchableOpacity>
            </View>
            </View>
            </View>
        )
    } else {
        //Hivsman ikke er logget i.
        return (
            <SignUpForm />
        )
    }
}

export default BookingDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#06A77D',  
        alignItems: 'center',
        justifyContent: 'center'  
    },
    cardContainer: {
        borderRadius: 20,
        backgroundColor: 'white',
        height: '95%',
        width: '95%',
    },
    label: {
        fontWeight: 'bold',
        padding: 10
    },
    button: {
        backgroundColor: '#0782F9',
        width: '80%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10
      },
      deleteButton: {
        backgroundColor: 'red',
        width: '80%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10
      },
      buttonContainer: {
        alignItems: 'center',
        height: 100
      },
      buttonText: {
        color: '#fff',
        fontSize: 18
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      textContainer: {
        height: '67%',
       alignItems: 'flex-start',
        marginTop: 10,
        
      }
  });
