import { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Button, Touchable} from 'react-native';
import firebase from 'firebase/compat';
import SignUpForm from '../SignUpForm'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

function WelcomePage () {

    const user = firebase.auth().currentUser

    if(user) {
        return (
            <ScrollView>
            <View style={styles.container}>

                <View style={styles.headerOneContainer}>
                    <Text style={styles.Title}>Welcome {user.email}!</Text>
                </View>

                <View style={styles.bodyContainer}>
                    <Text style={styles.headerText}>Behovet for UniMate:</Text>
                    <Text style={styles.text}>
                        Mange unge studerende føler sig presset i løbet af deres studietid, 
                        grundet et stort behov for at kunne præstere godt til eksamenerne. 
                        Et pres der opstår fra stramme krav, hårde bedømmelseskriterier og 
                        indbyrdes konkurrance om høje karakter som kan være med til at sikre gode 
                        fremtidig jobs og gunstige lønninger
                    </Text>

                    <Text style={styles.headerText}>Formål med UniMate:</Text>
                    <Text style={styles.text}>
                        Visionen for “UniMate” er derfor at skabe en peer-to-peer platform, hvor 
                        studerende nemt og hurtigt kan finde hjælp at strukturere en eksamensplan, 
                        få vejledning til emner inden for pensum, eller andre services som kan hjælpe 
                        med at lette presset fra studiet.
                    </Text>

                    <Text style={styles.headerText}>Videre udvikling af UniMate</Text>
                    <Text style={styles.text}>
                        UniMate er på nuværende stadie en beta version, hvor den endelig version,
                        forventes at have flere funktionaliteter og et bedre user interface, som
                        samlet set skal sikre det bedste brugeroplevelse med UniMate
                    </Text>

                </View>

                <View stylee={styles.buttonContainer}>
                    <TouchableOpacity onPress={()=> firebase.auth().signOut()} style={styles.button}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
      backgroundColor: 'white',
      height: 750
    },

// Styles til overskrift
    headerOneContainer: {
        alignSelf: 'center',
        width: '90%',
        marginTop: 125,
    },

    Title: {
        fontSize: 25,
        fontWeight: 'bold',
    },

// Styles til body
    bodyContainer: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        height: '65%',
      },

      headerText: {
        fontSize: 19,
        fontWeight: 'bold',
        marginTop: 30,
      },

      text: {
      },

// Styles til logout
      buttonContainer: {

      },
      button: {
        backgroundColor: '#0782F9',
        width: '80%',
        alignSelf: 'center',
        padding: 15,
        borderRadius: 10,
      },

      buttonText: {
        color: '#fff',
        fontSize: 18,
        alignSelf: 'center',
      },
      
  });
