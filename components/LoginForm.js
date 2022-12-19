import { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Button} from 'react-native';
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

    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

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

      <View style={styles.submit}>
        <Button color='orange' title="Login" onPress={handleSubmit} />
      </View>
    </View>
  )


}

export default LoginForm

//Styling
const styles = StyleSheet.create({
  error: {
    color: 'red'
  },
  inputField: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: 200
    
  },
  header: {
    fontSize: 40,
  },
  submit: {
    borderWidth: 1,
    width: 100,
    margin: 5,
    alignItems: 'center',
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },

})

