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
                    if(data) {
                        const myBookings = Object.values(data).filter(booking => booking.bookerID == user.uid)

                        setBookings(myBookings)
                    }
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
                <View style={styles.topContainer}>
                    <Text style={styles.header}>Here you can view your bookings.</Text>
                </View>
                <View style={styles.listContainer}>
            <FlatList
                data={bookingArray}
                keyExtractor={(item, index) => bookingKeys[index]}
                renderItem={({item, index}) => {
                    return (
                        <View>
                        <TouchableOpacity style={styles.listElement} onPress={() => selectBooking(bookingKeys[index])}>
                            <View style={styles.textContainer}>
                            <Text style={styles.text}>
                                Name: {item.name}
                            </Text>
                            <Text style={styles.text}>
                                Duration: {item.hours} hr {item.minutes} min.
                            </Text>
                            <Text style={styles.text}>
                                Price: {item.price}
                            </Text>
                            <Text style={styles.text}>
                                Date: {item.date}
                            </Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                    )
                }}         
            />
            </View>

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
        backgroundColor: 'white'
    },
    topContainer: {
        height: '10%',
        width: '95%',
        alignSelf: 'center',
        paddingTop: 10
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    listContainer: {
        width: '85%',
        alignSelf: 'center',
        height: '100%'

    },
    listElement: {
        backgroundColor: '#06A77D',
        height: 80,
        marginBottom: 25,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white'
    },
    textContainer: {
        width: '85%',
        alignItems: 'center'
    }
  });
