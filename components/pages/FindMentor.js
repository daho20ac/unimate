import { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Button, FlatList} from 'react-native';
import firebase from 'firebase/compat';
import SignUpForm from '../SignUpForm'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
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


function FindMentor ({navigation}) {
    //Vi finder brugere som er logget ind
    const user = firebase.auth().currentUser
    
    //Der tjekkes at der er logget ind
    if(user) {
        //Ref til firebase
        const firebaseUserRef = firebase.database().ref('/users/');

        //const [userProfiles, setUserProfiles] = useState()
        const [mentorProfiles, setMentorProfiles] = useState([])
        const [filteredCourses, setFilteredCourses] = useState([])
        
        //Find bruger profile i database
       /*useEffect(() => {
            if(!mentorProfiles) {
                firebaseUserRef.on("value", (snapshot) => {
                    let data = snapshot.val();
                    const mentors = Object.values(data).filter(user => user.hourlyWage != undefined)
                    setMentorProfiles(mentors)
                })
            }   
        },[])*/

        if(!mentorProfiles) {
            return (
                <View>
                <Text>Loading mentors from database...</Text>
                </View>
            )
        }

        const selectMentor = id => {
            const mentor = mentorProfiles[id]
            navigation.navigate('Mentor Details', { mentor})
        }

        
        const mentorArray = Object.values(mentorProfiles)
        const mentorKeys = Object.keys(mentorProfiles)

        return (
            <View style={styles.container}>
                <Text>
                    Here you can find a mentor to help you in your course.
                    You can use the filter to search for specific courses.
                </Text>
                <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={courseData}
                labelField="label"
                valueField="value"
                placeholder="--select courses--"
                value={filteredCourses}
                search={true}
                searchPlaceholder="Search..."
                onChange={items => {
                    setFilteredCourses(items);
                        firebaseUserRef.on("value", (snapshot) => {
                            let data = snapshot.val();
                            const mentors = Object.values(data).filter(user => user.hourlyWage != undefined)
                            
                            let filteredProfiles = []

                            for(let i = 0; i < items.length; i++) {
                                const test = mentors.filter(mentor => mentor.courses.includes(items[i]))
                                filteredProfiles.push(...test)
                            }

                            let unique = filteredProfiles.filter((value, index) => {
                                const _value = JSON.stringify(value);
                                return index === filteredProfiles.findIndex(obj => {
                                  return JSON.stringify(obj) === _value;
                                });
                              });
                            setMentorProfiles(unique)
                        })
                }} />
                {
                <FlatList 
            data={mentorArray}
            keyExtractor={(item, index) => mentorKeys[index]}
            renderItem={({ item, index }) => {
               return (
                <TouchableOpacity onPress={() => selectMentor(mentorKeys[index])}>
                    <Text>
                        Name: {item.name} Education: {item.Education} University: {item.University} Hourly Wage: {item.Education} Courses: {item.courses}
                    </Text>
                </TouchableOpacity>
               )
            }}
        />
        }

                
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
      marginTop: 50,
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
        width: 250,
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

