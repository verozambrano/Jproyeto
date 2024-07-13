import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import Login from '../screens/Login';
import Juego from '../screens/Juego';
import Registro from '../screens/Registro';
import Camara from 'screens/Camara';
import Galeria from 'screens/Galeria';

import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

function MyStack() {
    return (
      //Creación de rutas
      <Stack.Navigator initialRouteName='Juego'>
        <Stack.Screen name="Login" component= {Login} options={{ headerShown: false }} />
        <Stack.Screen name="Juego" component= {Juego} options={{ headerShown: false }}/>        
        <Stack.Screen name="Registro" component= {Registro} options={{ headerShown: false }}/>
        <Stack.Screen name="Camara" component= {Camara} options={{ headerShown: false }}/>
        <Stack.Screen name="Galeria" component= {Galeria} options={{ headerShown: false }}/>
      </Stack.Navigator>
   
    );
  }

export default function StackNavigator(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}