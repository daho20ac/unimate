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
                <Text>Welcome {user.email}</Text>
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
