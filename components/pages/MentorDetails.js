import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, Button, Touchable, Platform} from 'react-native';
import firebase from 'firebase/compat';
import SignUpForm from '../SignUpForm'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

function MentorDetails ({route, navigation}) {

    const user = firebase.auth().currentUser


    //Date picker
    //const [mode, setMode] = useState('date')
    //const [show, setShow] = useState(false)
    //const [text, setText] = useState('Empty')
    const [startingTime, setStartingTime] = useState(new Date())
    const [endingTime, setEndingTIme] = useState(new Date())
    const [hours, setHours] = useState()
    const [minutes, setMinutes] = useState()
    const [price, setPrice] = useState()


    //Mentor
    const [mentor, setMentor] = useState({})
/*
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios')
        setDate(currentDate);

        let tempDate = new Date(currentDate)
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
        
        setText(fDate + '\n' + fTime)
        
        console.log(fDate + '(' + fTime + ')')
    }


    const showMode = (currenMode) => {
        setShow(true);
        setMode(currenMode)

    }
*/

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


    const onChangeStart = (event, selectedDate) => {
        const currentDate = selectedDate || startingTime
        setStartingTime(currentDate)
        setEndingTIme(currentDate)
        calculateDuration()
    }
    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || endingTime
        setEndingTIme(currentDate)
        calculateDuration()    
    }

    const makeBooking = () => {
        firebase.database().ref('bookings/').set({
            bookerID: user.uid,
            name: mentor.name,
            university: mentor.university,
            education: mentor.education,
            occupation: mentor.occupation,
            bio: mentor.bio,
            startingTime: startingTime,
            endingTime: endingTime,
            hours: hours,
            minutes: minutes,
            price: price
          }).then(() => {
            alert(`You have succesfully booked ${mentor.name}. Duration is ${hours} hr ${minutes} min. and costs ${price}.`)
          }).catch(() => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage)
          })
    }




    useEffect(() => {
        route.params.mentor.courses = route.params.mentor.courses.toString()
        setMentor(route.params.mentor)
       return () => { setMentor({})}
    })
    if(!mentor) {
        return (
            <Text>No Tool was found</Text>
        )
    }
    
    if(user) {

        return (
            <View>
                {
            Object.entries(mentor).map((item,index)=>{
                return(
                    <View key={index} style={styles.container}>
                        <Text>{item[0]}: </Text>
                        <Text >{item[1]}</Text>
                    </View>
        
                )
                
            })
        }
        
            <View>
                <Text>Pleae select a starting time</Text>
                <DateTimePicker value={startingTime} mode="datetime" onChange={onChangeStart} timeZoneOffsetInMinutes={0} minuteInterval={15}/>
                <Text>Pleae select an ending time</Text>
                <DateTimePicker value={startingTime} mode="time" onChange={onChangeEnd} timeZoneOffsetInMinutes={0} minuteInterval={15}/>

                <Text>Total Price: {price}</Text>
                <Text>{hours} hr {minutes} min.</Text>


            </View>


                <TouchableOpacity style={styles.button} onPress={makeBooking}>
                    <Text style={styles.buttonText}>Make Booking</Text>
                </TouchableOpacity>
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
        flexDirection: 'row',
        width: '80%',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontWeight: 'bold'
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
