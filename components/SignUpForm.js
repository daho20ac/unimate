import { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Button, KeyboardAvoidingView, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from 'firebase/compat';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';





function SignUpForm() {

  //Statehook med email og password oprettes
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [education, setEducation] = useState('')
  const [occupation, setOccupation] = useState('')
  const [bio, setBio] = useState('')

  const [image, setImage] = useState(null);

  const [isCompleted, setCompleted] = useState(false) 


//vælge billede

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result.assets[0].uri)
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    const uploadImage = async () => {
      const uploadUri = image;
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

      try {
       await storage().ref(filename).putFile(uploadUri)
        Alert.alert('Image uploaded')
      } catch (error){
        console.log(error)
      }
    }

//Funtkion der håndterer logikken når der trykkes på 'Create User'
  const handleSubmit = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        firebase.database().ref('users/' + user.uid).set({
          name: name,
          type: type,
          education: education,
          occupation: occupation,
          profilePicture: image,
          bio: bio,

        })
        alert('User created successfully')

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage)
      });
  }

  //Der returneres et view hvor man kan skrive sin mail og password som man vil have oprettet som bruger. 
  return (
    <ScrollView style={{marginTop: 100}}>
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

    <View style={styles.inputContainer}>
      <TextInput 
        placeholder="email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        style={styles.inputField}
      />
    
      <TextInput secureTextEntry={true}
        placeholder="password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        style={styles.inputField}
      />
      
      <TextInput
        placeholder="name"
        value={name}
        onChangeText={(name) => setName(name)}
        style={styles.inputField}
      />

      <TextInput
        placeholder="education"
        value={education}
        onChangeText={(education) => setEducation(education)}
        style={styles.inputField}
      />

    <TextInput
        placeholder="occupation"
        value={occupation}
        onChangeText={(occupation) => setOccupation(occupation)}
        style={styles.inputField}
      />
      <TextInput
        placeholder="bio"
        value={bio}
        onChangeText={(bio) => setBio(bio)}
        style={styles.bioField}
        multiline={true}
      />
    </View>
  
    <Picker
        selectedValue={type}
        style={styles.pickerContainer}
        onValueChange={(itemValue, itemIndex) => setType(itemValue)}
        mode="dropdown"
      >
        <Picker.Item label="Student" value="student" />
        <Picker.Item label="Tutor" value="tutor" />
    </Picker>


    <View style={styles.buttonContainer}>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
      <Text style={styles.buttonText}>Choose a profile picture</Text>
      </TouchableOpacity>
    
      {image && <Image source={{ uri: image }} style={styles.image}/>}


        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
         <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
    </ScrollView>
  )


}

export default SignUpForm

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollViewContainer: {
        marginTop: 100
    },
    header: {
      fontSize: 24,
      marginBottom: 20
    },
    inputContainer: {
        width: '80%',
        marginTop: 10
    },
    inputField: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 10,
      fontSize: 16,
      borderRadius: 10
    },
    picker: {
      height: 50,
      width: 150,
    },
    imagePicker: {
      width: '100%',
      height: 200,
      marginBottom: 10
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:40
    },
    button: {
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 10
    },
    bioField: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      
      fontSize: 16,
      borderRadius: 10,
      height: 100
    },
    buttonText: {
      color: '#fff',
      fontSize: 18
    },
    image: {
      borderRadius: 10,
      width: 200, 
      height: 200,
      marginBottom: 10 
    },
    pickerContainer: {
      height: 50,
      width: 200,
      marginBottom: 100,
      flex: 1,
      marginTop: -40
    }
  });
