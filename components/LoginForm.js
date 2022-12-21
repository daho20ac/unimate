import { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Button, Image, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import firebase from 'firebase/compat';
import { ScrollView } from 'react-native-gesture-handler';



function LoginForm() {

  //State hook for email og password oprettes. Intial state er bare '' men når der skrives tekst i felterne ændres dette.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isCompleted, setCompleted] = useState(false) 

//Funktion der håndterer logikken når der trykkes "login" på siden.
  const handleSubmit = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
    } else {
        alert(errorMessage);
    }
    console.log(error);
});
  }

//Der returneres et view hvor man kan skrive sin mail, password og en knap hvor man kan trykke logind.
  return (
    <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.TopSectionContainer}>
        <View style={styles.TopSection}>
        <Image style={styles.Logo}
            source={require('../assets/UniMate.png')}
        />
        </View>
      </View>


      <View style={styles.BottomSectionContainer}>
        <View style={styles.BottomSection}>

          <View style={styles.LoginContainer}>
            <TextInput 
            placeholder="email"
            value={email}
            onChangeText={(email) => setEmail(email)}
            style={styles.inputField}
            />

            <TextInput 
            secureTextEntry={true}
            placeholder="password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            style={styles.inputField}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
      </KeyboardAvoidingView>
  )


}

export default LoginForm

const styles = StyleSheet.create({
// Styling til keyboard avoid view
  container: {
    flex: 1,
  },

// Styling til den kurvet baggrund
  TopSectionContainer: {
    backgroundColor: 'white',
    flex: 6,
    },

  TopSection: {
    backgroundColor: '#06A77D',
    flex: 1,
    borderBottomRightRadius: 75,
    },

    BottomSectionContainer: {
      backgroundColor: '#06A77D',
      flex: 8,
    },

  BottomSection: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 75,
  },

// Styling til logo som ligger i Top Section
  Logo: {
    marginTop: 75,
    height: 200,
    width: 220,
    alignSelf: 'center',
  },

// Styling til login sektionen
  LoginContainer: {
    marginTop: 75,
    width: '85%',
    alignSelf: 'center',
  },

  inputField: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    padding: 10,

  },

  button: {
    backgroundColor: '#0782F9',
    width: '85%',
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

// Ved ikke hvad det er til - Error message måske?
  error: {
    color: 'red'
  },

})

