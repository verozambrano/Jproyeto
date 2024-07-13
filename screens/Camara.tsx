import { useState } from 'react';
import React from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import {  ref, uploadBytes } from "firebase/storage";
import { storage } from '../components/Config';

export default function Camara() {
  const [image, setImage] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 6],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  async function subir(){
    const storageRef = ref(storage, 'usuarios/imagenes/imagen.png');

    const response = await fetch(image);
    const blob = await response.blob();
// 'file' comes from the Blob or File API
uploadBytes(storageRef, blob).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});

   }

  return (
    <View style={styles.container}>
      <Button title="Abrir camara" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});