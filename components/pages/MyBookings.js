import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, Button, FlatList} from 'react-native';
import firebase from 'firebase/compat';
import SignUpForm from '../SignUpForm'
import { TouchableOpacity } from 'react-native-gesture-handler';

function MyBookings ({navigation}) {

    const user = firebase.auth().currentUser

    const [bookings, setBookings] = useState()

    const selectBooking = id => {
        const booking = bookings[id]
        navigation.navigate('Booking Details', { booking })
    }

    
   
    if(user) {
        useEffect(() => {
            if(!bookings) {
                const firebaseUserRef = firebase.database().ref('/bookings/');
                firebaseUserRef.on('value', (snapshot) => {
                    let data = snapshot.val()
                    const myBookings = Object.values(data).filter(booking => booking.bookerID == user.uid)

                    setBookings(myBookings)
            }, [])

            }
        })
        
        if(!bookings) {
            return (
                <View style={styles.container}>
                    <Text>You have no bookings currently.</Text>
                </View>
            )
        }

        const bookingArray = Object.values(bookings)
        const bookingKeys = Object.keys(bookings)

        return (
            <View style={styles.container}>
            <FlatList 
                data={bookingArray}
                keyExtractor={(item, index) => bookingKeys[index]}
                renderItem={({item, index}) => {
                    return (
                        <View>
                        <TouchableOpacity onPress={() => selectBooking(bookingKeys[index])}>
                            <Text>
                                Name: {item.name} Duration: {item.hours} hr {item.minutes} min. Price: {item.price}
                            </Text>
                        </TouchableOpacity>
                        </View>
                    )
                }}
            
            />
            </View>
        )
    } else {
        return (
            <SignUpForm />
        )
    }
}

export default MyBookings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
      text: {
        marginTop: 150
      }
  });
