import { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Button, Touchable} from 'react-native';
import firebase from 'firebase/compat';
import SignUpForm from '../SignUpForm'
import { TouchableOpacity } from 'react-native-gesture-handler';

function InformationPage () {

    const user = firebase.auth().currentUser

    if(user) {
        return (
            <View style={styles.container}>
                <Text>
                    Det langsigtede mål og vision for “UniMate” er at hjælpe studerende i forbindelse med 
                    lektie- og eksamenspres for at hjælpe dem med at komme igennem studiet, 
                    få de høje karakterer eller en sparringspartner. I forbindelse med dette 
                    skal applikationen skabe værdi for brugerne ved at de hurtigt er i stand til at
                    komme i kontakt med en mentor og modtage hjælp.
                </Text>
                <TouchableOpacity onPress={()=> firebase.auth().signOut()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <SignUpForm />
        )
    }
}

export default InformationPage

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
