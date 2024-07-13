import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../components/Config";
import { useFonts } from 'expo-font';

export default function Login({ navigation }:any) {
  const [correo, setCorreo] = useState("");
  const [pass, setPass] = useState("");

  function login() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, correo, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        Alert.alert("EMPEZAMOS...!!!", "Atrapa la mayor cantidad de patos en el tiempo establecido...!!!");
        navigation.navigate("Juego");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/wrong-password") {
          Alert.alert("Error", "Verifique las credenciales");
        } else {
          Alert.alert("Error");
        }
        console.log(errorCode);
      });

    limpiar();
  }

  function limpiar() {
    setCorreo("");
    setPass("");
  }

  function registrar() {
    navigation.navigate("Registro");
  }

  //Importar fonts
  const [fontsLoaded] = useFonts({
    'pixel': require('../assets/fonts/pixel.ttf'),
  });

  if(!fontsLoaded){
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Stage01.png")}
        style={styles.backgroundImage}
      >
        <Image source={require("../assets/title.png")} style={styles.imgT} />

        <TextInput
          placeholder="Ingrese login"
          keyboardType="email-address"
          onChangeText={(text) => setCorreo(text)}
          value={correo}
          style={styles.inputLogin}
        />

        <TextInput
          placeholder="Ingrese su contraseña"
          secureTextEntry={true}
      
          onChangeText={(text) => setPass(text)}
          value={pass}
          style={styles.inputPass}
        />

        <TouchableOpacity style={styles.btn} onPress={() => login()}>
          <Text style={styles.txtBtn}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => registrar()}>
          <Text style={styles.txtBtn}>REGISTRAR</Text>
        </TouchableOpacity>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imgT: {
    width: '100%',
    height: 60,
    margin: 5
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    color: "#fff",
    height: 30,
    width: '85%',
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
    margin: 5,
    fontFamily: "pixel"
  },
  txtBtn: {
    color: "#fff",
    fontFamily: "pixel"
  },
  inputLogin: {
    width: '80%',
    textAlign : "center",
    borderBottomWidth: 1, // Ancho de la línea inferior de guía
    borderBottomColor: 'black', // Color de la línea inferior de guía (opcional)
    paddingVertical: 5, // Espacio vertical interno del TextInput
    margin: 5,
    fontWeight: 'bold'
  },
  inputPass: {
    width: '80%',
    textAlign : "center",
    borderBottomWidth: 1, // Ancho de la línea inferior de guía
    borderBottomColor: 'black', // Color de la línea inferior de guía (opcional)
    paddingVertical: 5, // Espacio vertical interno del TextInput
    margin: 5,
    fontWeight: 'bold',    
  },

});
