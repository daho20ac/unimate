import { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Button, Touchable} from 'react-native';
import firebase from 'firebase/compat';
import SignUpForm from '../SignUpForm'
import { TouchableOpacity } from 'react-native-gesture-handler';

function WelcomePage () {

    const user = firebase.auth().currentUser

    if(user) {
        return (
            <View style={styles.container}>
                <Text>Welcome {user.email}</Text>

                <Text>
                    Det langsigtede mål og vision for “UniMate” er at hjælpe studerende i forbindelse med 
                    lektie- og eksamenspres for at hjælpe dem med at komme igennem studiet, 
                    få de høje karakterer eller en sparringspartner. I forbindelse med dette 
                    skal applikationen skabe værdi for brugerne ved at de hurtigt er i stand til at
                    komme i kontakt med en mentor og modtage hjælp.
                </Text>
                <TouchableOpacity onPress={()=> firebase.auth().signOut()} style={styles.button}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <SignUpForm />
        )
    }
}

export default WelcomePage

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
  });
