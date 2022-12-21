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
                <View style={styles.TopContainer}>
                    <Text style={styles.headerText}>Find your mentor</Text>
                    <Text style={styles.bodyText}>
                        Here you can find a mentor to help you in your course.
                        You can use the filter to search for a specific course. 
                        Click on the mentor if you wish to book.
                    </Text>
                </View>

                <View style={styles.multiSelectContainer}>
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
                <TouchableOpacity style={styles.listElement} onPress={() => selectMentor(mentorKeys[index])}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            Name: {item.name} Education: {item.education} University: {item.university} Hourly Wage: {item.hourlyWage} Courses: {item.courses}
                        </Text>
                    </View>
                </TouchableOpacity>
               )
            }}
        />
        }

                </View>
                
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
    },

// Styling til top section
    TopContainer: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
    },

    headerText: {
        fontSize: 20,
        fontWeight: 'bold'
      },

    bodyText: {
        marginTop: 10,
      },

// Styling til multiSelect
    multiSelectContainer: {
        marginTop: 20,
        alignItems: 'center',
        flex: 1,
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


// Styling af flat list text

    listElement: {
        backgroundColor: '#06A77D',
        height: 75,
        marginTop: 18,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textContainer: {
        width: '90%',
        alignItems: 'center',
        flexWrap: 'wrap',
    },

    text: {
        color: 'white'
    },





  });

