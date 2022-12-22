import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, Button, Touchable, Platform} from 'react-native';
import firebase from 'firebase/compat';
import SignUpForm from '../SignUpForm'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

function MentorDetails ({route, navigation}) {

    const user = firebase.auth().currentUser

    //Date picker variable
    const [startingTime, setStartingTime] = useState(new Date())
    const [endingTime, setEndingTIme] = useState(new Date())
    const [hours, setHours] = useState()
    const [minutes, setMinutes] = useState()
    const [price, setPrice] = useState()


    //Mentor som man har trykket på
    const [mentor, setMentor] = useState({})

    //Funktion der bruges til at udregne tid og pris for det valgte start og sluttidspunkt.
    const calculateDuration = () => {
        const duration = Math.abs(endingTime - startingTime) / 3600000;
        const hours = Math.floor(duration)
        const minutes = Math.round(duration % 1 * 60)
        
        setHours(hours)
        setMinutes(minutes)

        const hourlyWage = Number(mentor.hourlyWage)
        
        const priceHours = hourlyWage * hours
        const priceMinutes = (hourlyWage / 60) * minutes
        const fullPrice = priceHours + priceMinutes

        setPrice(fullPrice)
    }

    //Funktion der invokes når man ændrer et starttidspunkt.
    const onChangeStart = (event, selectedDate) => {
        const currentDate = selectedDate || startingTime
        setStartingTime(currentDate)
        setEndingTIme(currentDate)
        calculateDuration()
    }
     //Funktion der invokes når man ændrer et starttidspunkt.
    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || endingTime
        setEndingTIme(currentDate)
        calculateDuration()    
    }
    //Funktion der behandler logikken for når der trykkes på "Make Booking"
    const makeBooking = () => {
        const dates = startingTime.getDate()
        const month = startingTime.getMonth() + 1
        const year = startingTime.getFullYear()
        const date = `${dates}/${month}/${year}`

        //Vi tilføjer de relevante oplysninger til firebasedatabasen i en ny booking.
        firebase.database().ref('/bookings/').push({
            bookerID: user.uid,
            name: mentor.name,
            university: mentor.university,
            education: mentor.education,
            occupation: mentor.occupation,
            bio: mentor.bio,
            date: date,
            hours: hours,
            minutes: minutes,
            price: price
          }).then(() => {
            //Hvis bookingen tilføjes til databasen får man en alert om at det er sket succesfuldt.
            alert(`You have succesfully booked ${mentor.name}. Duration is ${hours} hr ${minutes} min. and costs ${price}.`)
          }).catch(() => {
            //errorhandli ng
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage)
          })
    }


    //Man tager tildeler mentor-variablen informationerne om den mentor man har trykket på i FindMentor listen.
    useEffect(() => {
        route.params.mentor.courses = route.params.mentor.courses.toString()
        setMentor(route.params.mentor)
       return () => { setMentor({})}
    })
    if(!mentor) {
        return (
            <Text>No mentor was found</Text>
        )
    }
    
    if(user) {

        //Der returneres en oversigt over mentorens brugereoplsyninger.

        return (
            <View style={styles.container}>


                <ScrollView style={styles.bodyContainer}>
                {
                Object.entries(mentor).map((item,index)=>{
                    return(
                        <View key={index} style={styles.inputContainer}>
                            <Text style={styles.label}>{item[0]}: </Text>
                            <Text >{item[1]}</Text>
                        </View>
                    )                
               })
               }
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>Pleae select a starting time</Text>
                    <DateTimePicker style={styles.timePicker} value={startingTime} mode="datetime" onChange={onChangeStart} timeZoneOffsetInMinutes={0} minuteInterval={15}/>
                    <Text style={styles.timeText}>Pleae select an ending time</Text>
                    <DateTimePicker style={styles.timePicker} value={startingTime} mode="time" onChange={onChangeEnd} timeZoneOffsetInMinutes={0} minuteInterval={15}/>

                    <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>Total Price: {price}</Text>
                        <Text style={styles.priceText}>{hours} hr {minutes} min.</Text>
                    </View>
                </View>

                </ScrollView>


                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={makeBooking} style={styles.button}>
                    <Text  style={styles.buttonText}>Make booking</Text>
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

export default MentorDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#06A77D',
    },

    topContainer: {

    },

    HeaderText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 30,
        marginTop: 10,
    },

    bodyContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '85%',
        alignSelf: 'center',
        marginTop: 10,
        padding: 10,
        marginBottom: 10,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
    },

    label: {
        fontWeight: 'bold',
    },

// Time text styling
    timeContainer: {
        marginTop: 30,
    },    
    timeText: {
        fontSize: 15,
        fontWeight: 'bold',

    },

    timePicker: {
        alignSelf: 'flex-start',
    },

// Price text styling

    priceContainer: {
        marginTop: 50,
        alignItems: 'center'
    },

    priceText: {
        fontSize: 20,
        fontWeight: 'bold',

    },

    // Styles til create knappen i bunden (også lidt til insert picture knap)
  buttonContainer: {
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
    height: 'auto',
  },

  button: {
    backgroundColor: '#0782F9',
    width: '80%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center',
  },


  });
