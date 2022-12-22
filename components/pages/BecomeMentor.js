import { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Button, Touchable} from 'react-native';
import firebase from 'firebase/compat';
import SignUpForm from '../SignUpForm'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { MultiSelect } from 'react-native-element-dropdown';

//Data for de foskellige fag.
const courseData = [
    { label: "VØS 1", value:"VØS 1" },
    { label: "Makroøkonomi", value:"Makroøkonomi" },
    { label: "Humanbiologi", value:"Humanbiologi" },
    { label: "Marketing", value:"Marketing" },
    { label: "Innovation og ny teknologi", value:"Innovation og ny teknologi" },
    { label: "International Law", value:"International Law" },
    { label: "EU-ret", value:"EU-ret" },
    { label: "Retshistorie", value:"Retshistorie" },
    { label: "Mave, tarm og lever", value:"Mave, tarm og lever" },
    { label: "Regnskab", value:"Regnskab" },
    { label: "Patientkontakt", value:"Patientkontakt" },
    { label: "Imuunologi", value:"Imuunologi" },
    { label: "Finansiering", value:"Finansiering" },
    { label: "Mikroøkonomi", value:"Mikroøkonomi" },
    { label: "Programmering", value:"Programmering" }
]

function BecomeMentor () {

    //Brugerens authentication oplysninger hentes
    const user = firebase.auth().currentUser

    //Hvis brugeren er logget ind
    if(user) {

        //Firebase realtime database referencer
        const firebaseUserRef = firebase.database().ref('/users/' + user.uid);
        const firebaseMentorRef = firebase.database().ref('/mentors/' + user.uid);

        const [userProfile, setUserProfile] = useState('')
        const [hourlyWage, setHourlyWage] = useState('')
        const [courses, setCourses] = useState([])

        //Find bruger profile i database
        useEffect(() => {
            if(!userProfile) {
                firebaseUserRef.once("value", (snapshot) => {
                    let data = snapshot.val();
                    setUserProfile(data)
                })
            }
            
        },[])
        //Funtkion der håndterer logikken når der trykkes på 'Become mentor!'
        const handleSubmit = () => {
            //Mentoroplysninger pushes til firebase databasen
        firebase.database().ref('users/' + user.uid).set({
          name: userProfile.name,
          university: userProfile.university,
          education: userProfile.education,
          occupation: userProfile.occupation,
          bio: userProfile.bio,
          hourlyWage: hourlyWage,
          courses: courses
      })
      .then(() => {
        alert('You have succesfully become a mentor!')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage)
      });
  }
        // Der retuneres en side hvor man kan indskrive sin timeløn og fag man vil være mentor i.
        //Man kan trykke 'Become Mentor' for at gøre sig selv til mentor i de pågældende fag.
        return (
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>
                    {userProfile.name}, want to become a mentor?  
                </Text>
                <View style={styles.textContainer}>
                <Text style={styles.infoText}>Here you can sign up to become a mentor!</Text>
                <Text style={styles.infoText}>But first, we need some more information about you!</Text>
                </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.inputField}
                    placeholder="hourly wage"
                    value={hourlyWage}
                    onChangeText={(hourlyWage) => setHourlyWage(hourlyWage)}
                />

                <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={courseData}
                labelField="label"
                valueField="value"
                placeholder="--select courses to mentor--"
                value={courses}
                search={true}
                searchPlaceholder="Search..."
                onChange={item => {
                    setCourses(item);
                }} />


        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Become a mentor!</Text>
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

export default BecomeMentor

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 100,
      backgroundColor: '#fff',
      height: 750
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        borderRadius: 10,
        padding: 10,
    
      }, 
      header: {
        marginLeft: '5%',
        fontSize: 25,
        fontWeight: "bold"
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        alignSelf: 'center',
      },
      textContainer: {
        marginTop: 25,
        padding: '5%'
      },
      inputContainer: {
        width: '85%',
        alignSelf: 'center',
      },
    dropdown: {
        height: 50,
        width: '95%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        textAlign: 'center',
        marginTop: 10
        
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '85%',
        alignSelf: 'center',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 40,
      },
      buttonText: {
        color: '#fff',
        fontSize: 18
      },
  });
