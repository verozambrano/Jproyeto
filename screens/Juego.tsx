import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import React, { useState, useEffect } from "react";

import { createUserWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig, db } from "../components/Config";
import { getDatabase, ref, set, onValue } from "firebase/database";

import { Modal } from "react-native";

import Pato from "../components/Pato";

import { useFonts } from "expo-font";
import Pato2 from "../components/Pato2";
import { Audio } from 'expo-av';


// import { firebaseConfig } from '../components/Config';

export default function Juego({ navigation }:any) {
  
  const [tiempo, setTiempo] = useState(10);
  const [contador, setContador] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [patosCazados, setPatosCazados] = useState(0);

  const [nick, setNick] = useState(""); /////Borrar////
  const [patos, setPatos] = useState(""); /////Borrar/////
  const [sound, setSound] = useState<Audio.Sound | null>(null);



  useEffect(() => {
    // const temporizador = setInterval(() => {
    //   setTiempo((tiempoAnterior) => tiempoAnterior-1)
    // }, 1000 //Milisegundos
    // )

    //setInterval: Función exclusiva de RN para medir el tiempo
    const temporizador = setInterval(() => {
      setTiempo((tiempoAnterior) => {
        if (tiempoAnterior == 1) {
          clearInterval(temporizador); //Detiene el temporizador
        }
        return tiempoAnterior - 1;
      });
    }, 1000); //Milésimas de un segundo
  }, []);

  useEffect(() => {
    if (tiempo == 0) {
      setPatosCazados(contador);
      setModalVisible(true);
      // Alert.alert("GAME OVER", "Su puntuación es: " + contador);
      setTiempo(10);
      //Función que envía la puntuación a firebase
     // puntuacion();
      setContador(0);
    }
  }, [tiempo]);

  /////////////////////////////////////////////////////////////////

  function contar() {
    setContador(contador + 1);
    playSound()
  }

  ////////////////////////////////////////////////////////////////

  // function reiniciarTemporizador() {
  //   setTiempo(10); // Restablece el valor del temporizador a 10 segundos
  // }

  /////////////////////////////////////////////////////////////////

  function registrar() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    createUserWithEmailAndPassword(auth, nick, patos)
      .then((userCredential: { user: any; }) => {
        // Signed in
        const user = userCredential.user;

        guardar(nick, patos);

        Alert.alert("REGISTRO EXITOSO", "Ahora atrapa la mayor cantidad de patos en el tiempo establecido...!!!");
        navigation.navigate("Juego");

        // ...
      })
      .catch((error: { code: any; message: any; }) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", "Ingrese sus datos nuevamente");
        console.log(errorMessage)
        // ..
      });
  }


  //Función para guardar los datos en un json
  function guardar(nickE: string, patosE: string) {
    /* Se elimina la línea 45 debido a que ya se encuentra
  implementada en el archivo Config.js*/
    // const db = getDatabase();
    set(ref(db, "jugadores/" + nick), {
      nick: nickE,
      patos: patosE,
    });
  }

  // const jugador = setNick(onValue) ;

  // Función para guardar en Firebase
  function puntuacion() {
    set(ref(db, "puntuacion/" + nick), {
      nick: nick,
      puntaje: contador,
    });
  }

  function logOut() {
    // const app = initializeApp(firebaseConfig);
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.navigate("Login");
        setModalVisible(false);
      })
      .catch((error) => {
        // An error happened.
        Alert.alert("Error");
      });
  }

  function reiniciar() {
    navigation.navigate("Juego");
    setModalVisible(false);
    const temporizador = setInterval(() => {
      setTiempo((tiempoAnterior) => {
        if (tiempoAnterior == 1) {
          clearInterval(temporizador); //Detiene el temporizador
          playSound2()
        }
        return tiempoAnterior - 1;
      });
    }, 1000); //Milésimas de un segundo
   
  }


  //Importar fonts
  const [fontsLoaded] = useFonts({
    pixel: require("../assets/fonts/pixel.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  ///////////////

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('../assets/shut.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  async function playSound2() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('../assets/fin.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }




  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Stage01.png")} // Ruta de la imagen de fondo
        style={styles.backgroundImage}
      >
        <View style={styles.fila}>
          <View style={{flexDirection:'row'}}>
            <Image source={require('../assets/duck_hunt_logo.png')} style={styles.imgT} />
            <Text style={{fontSize:25, color:'white'}}>  {contador}</Text>
          </View>
         
            <Text style={styles.time}>{tiempo}</Text>

        </View>

        <Pato presionar={contar} />
        <Pato2 presionar={contar} />

        <Modal
          visible={isModalVisible}
          // onBackdropPress={() => setModalVisible(false)}
          animationType="fade"
          transparent={true}
          style={styles.modalContainer}
        >
          <View style={styles.modal}>
            <Image source={require("../assets/dog.png")} style={{ width: 300, height: 200 }} />
            <Text>{'\n'}</Text>
            <Text style={styles.txtFin}>FIN DE LA PARTIDA...!!!</Text>
            <Text></Text>
            <Text style={styles.txtResultado}>Usted ha cazado: {patosCazados} patos</Text>

            <View style={styles.row}>
              <TouchableOpacity style={styles.btn} onPress={() => reiniciar()}>
                <Text style={styles.txtBtn}>Reiniciar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btn} onPress={() => logOut()}>
                <Text style={styles.txtBtn}>Salir</Text>
              </TouchableOpacity>

            </View>

            <TouchableOpacity
              onPress={() => {
                // Acción al presionar el botón 2
                setModalVisible(false);
              }}
            >
            </TouchableOpacity>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",

    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
  },
  btn: {
    color: "#fff",
    height: 30,
    width: "30%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
    margin: 10,
  },
  txtResultado: {
    color: "#fff",
    fontFamily: "pixel",
  },
  txtFin: {
    color: "#fff",
    fontFamily: "pixel"

  },
  txtBtn: {
    color: "#fff",
    fontFamily: "pixel",

  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    // flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "pixel",
  },
  imgT: {
    height: "100%",
    width: "29%",

  },

  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    height: "5%",
    width:"80%",
    borderRadius: 30,
    top: "5%"


  },
  time: {
    color: 'white',
    fontSize: 40,

  },


});


