import { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Button, KeyboardAvoidingView, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from 'firebase/compat';
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown'


//Universiteter
const Universities = [
  { label: 'Copenhagen Business School', value: 'Copenhagen Business School' },
  { label: 'University of Copenhagen', value: 'University of Copenhagen' },
];

//CBS Uddannelser
const cbsEducations = [
  { label: 'HA. IT', value: 'HA. IT' },
  { label: 'HA. Almen', value: 'HA. Almen'}
];

//KU Uddannelser
const kuEducations = [
  { label: 'Medicin', value: 'Medicin' },
  { label: 'Jura', value: 'Jura' },
];



function SignUpForm() {

  //Statehook med email og password oprettes
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [occupation, setOccupation] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState(null);
  const [university, setUniversity] = useState(null);
  const [education, setEducation] = useState(null);
  const [select, setSelect] = useState(false);
  const [isCompleted, setCompleted] = useState(false) 


//Funktion der gør man kan vælge profilbillede fra sin telefon
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
//Funktion der skulle uploade profilbillede til storage (Virker ikke i nuværende iteration)
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
    //Authentication i firebase oprettes
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        firebase.database().ref('users/' + user.uid).set({
          name: name,
          university: university,
          education: education,
          occupation: occupation,
          bio: bio,

        })
        alert('User created successfully')

      })
      //Errorhandlin g
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage)
      });
  }

  //Der returneres et view hvor man kan udfylde forskellige felter til oprettelse af. 
  return (
    <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Sign Up</Text>
      </View>
      
      <ScrollView>
          <View style={styles.bodyContainer}>

            <View style={styles.bodyElement}>
              <Text style={styles.bodyElemntText}>Email</Text>
              <TextInput 
              placeholder="Your Email"
              value={email}
              onChangeText={(email) => setEmail(email)}
              style={styles.inputField}
              />
            </View>

            <View style={styles.bodyElement}>
              <Text style={styles.bodyElemntText}>Name</Text>
              <TextInput
              placeholder="Your Name"
              value={name}
              onChangeText={(name) => setName(name)}
              style={styles.inputField}
              />
            </View>

            <View style={styles.bodyElement}>
              <Text style={styles.bodyElemntText}>Password</Text>
              <TextInput secureTextEntry={true}
              placeholder="Your Password"
              value={password}
              onChangeText={(password) => setPassword(password)}
              style={styles.inputField}
              />
            </View>

            <View style={styles.bodyElement}>
              <Text style={styles.bodyElemntText}>Occupation</Text>
              <TextInput
              placeholder="Your Occupation"
              value={occupation}
              onChangeText={(occupation) => setOccupation(occupation)}
              style={styles.inputField}
              />
            </View>

            <View style={styles.bodyElement}>
              <Text style={styles.bodyElemntText}>Write about yourself</Text>
              <TextInput
              placeholder="Your Bio"
              value={bio}
              onChangeText={(bio) => setBio(bio)}
              style={styles.inputBioField}
              multiline={true}
            />
            </View>

            <View style={styles.bodyElement}>
              <Text style={styles.bodyElemntText}>Select your University & Education</Text>
              <Dropdown 
              style={styles.inputDropDown} data={Universities}
              placeholderStyle={styles.inputplaceholderStyle} 
              selectedTextStyle={styles.inputselectedTextStyle} 
              labelField="label" valueField='value'
              value={university}
              placeholder='--SELECT--' 
              onChange={item => {
                          setUniversity(item.value)
                          setSelect(true)
                        }}
              />
              {university && <Dropdown
              data={university == 'Copenhagen Business School' ? cbsEducations : kuEducations}
              style={styles.inputDropDown}
              labelField="label"
              valueField="value"
              placeholder={'--Select--'}
              searchPlaceholder="Search..."
              value={education}
              onChange={item => {
                          setEducation(item.value);
                        }}
              />}
            </View>

            <View style={styles.bodyElement}>
              <Text style={styles.bodyElemntText}>Select profile picture</Text>
              <View style={styles.pictureElement}>
                <TouchableOpacity style={styles.insertPicture} onPress={pickImage}>
                  <Text style={styles.buttonText}>Profile picture</Text>
                </TouchableOpacity>
                <View></View>
              </View>
            </View>

          
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text  style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
      </View>


    </KeyboardAvoidingView>
  )
}

export default SignUpForm

const styles = StyleSheet.create({
// Styles til hele siden gennem keybordavoiding
  container: {
    flex: 1,
    backgroundColor: '#06A77D',    
  },

// Styles til header / overskrift
  headerContainer: {
    width: '85%',
    height: 100,
    alignSelf: 'center',
  },
  header: {
    fontSize: 34,
    marginTop: 55,
    color: 'white',
  },

// Styles til hele body parten som repræsentere inputfelter osv.
  bodyContainer: {
    backgroundColor: 'white',
    width: '85%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    height: 'auto',
    borderRadius: 20,
  },

  bodyElement: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },

  bodyElemntText: {
    marginLeft: 10,
    fontSize: 16,
  },

  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 5,
    fontSize: 16,
    borderRadius: 10
  },

  inputBioField: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
  },

  inputDropDown: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 3,                 // Padding anderledes end tekstinput felterne
    borderRadius: 10,
    marginBottom: 10,
  },

  pictureElement: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,

  },

  insertPicture: {
    backgroundColor: '#0782F9',
    width: '30%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,

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
