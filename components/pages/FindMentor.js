import { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Button, Touchable} from 'react-native';
import firebase from 'firebase/compat';
import SignUpForm from '../SignUpForm'
import { TouchableOpacity } from 'react-native-gesture-handler';

function FindMentor () {
    //Vi finder brugere som er logget ind
    const user = firebase.auth().currentUser
    
    //Der tjekkes at der er logget ind
    if(user) {
        //Refs til firebase
        const firebaseUserRef = firebase.database().ref('/users/');
        const firebaseMentorRef = firebase.database().ref('/mentors/');

        const [userProfiles, setUserProfiles] = useState()
        const [mentorProfiles, setMentorProfiles] = useState([])
        
        //Find bruger profile i database
        useEffect(() => {
            if(userProfiles) {
                firebaseUserRef.on("value", (snapshot) => {
                    let data = snapshot.val();
                    setUserProfiles(data)
                    /*data.forEach((userProfile) => {
                       // console.log(userProfile)
                    })*/
                    //let mentors = Object.values(data).filter(mentor => mentor.hourlyWage != undefined)
                    //console.log(mentors)
                })
            }   
        },[])

    
        return (
            <View style={styles.container}>
                <Text>Welcome {user.email}</Text>
                <TouchableOpacity onPress={()=> firebase.auth().signOut()} style={styles.button}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
        //Hvis brugeren ikke er logget ind kan 
    } else {
        return (
            <SignUpForm />
        )
    }
}

export default FindMentor

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
