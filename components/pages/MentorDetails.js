import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, Button, Touchable} from 'react-native';
import firebase from 'firebase/compat';
import SignUpForm from '../SignUpForm'
import { TouchableOpacity } from 'react-native-gesture-handler';

function MentorDetails ({route, navigation}) {

    const user = firebase.auth().currentUser

    const [mentor, setMentor] = useState({})
    //console.log(mentor)

    useEffect(() => {
        route.params.mentor.courses = route.params.mentor.courses.toString()
        setMentor(route.params.mentor)
       return () => { setMentor({})}
    })

    if(!mentor) {
        return (
            <Text>No Tool was found</Text>
        )
    }

    if(user) {
        return (
            <View>
                {
            Object.entries(mentor).map((item,index)=>{
                return(
                    <View key={index} style={styles.container}>
                        <Text>{item[0]}: </Text>
                        <Text >{item[1]}</Text>
                    </View>
                    
                )
                
            })
        }
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Make Booking</Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <SignUpForm />
        )
    }
}

export default MentorDetails

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
