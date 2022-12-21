import { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Button, Touchable} from 'react-native';
import firebase from 'firebase/compat';
import SignUpForm from '../SignUpForm'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MultiSelect } from 'react-native-element-dropdown';


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

    const user = firebase.auth().currentUser

    if(user) {
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
        //Funtkion der håndterer logikken når der trykkes på 'Create User'
        const handleSubmit = () => {
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
        
        return (
            <View style={styles.container}>
                <Text>
                    Hello {userProfile.name}! Here you can sign up to become a mentor!
                    Firstly, we need some more information about you! 
                </Text>
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
      inputField: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
        borderRadius: 10
      },
      inputContainer: {
        width: '80%',
        marginTop: 10
    },
    dropdown: {
        height: 50,
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
