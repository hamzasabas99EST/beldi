import React,{useState,useEffect} from 'react'
import { View,Text,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Test=()=>{

    useEffect( () => {
        getData()
    
    });

    const deleteStorage=async()=>{
        await AsyncStorage.removeItem("idClient")
        alert("Delete it")
    }

    const getData=async()=>{
        const value=await AsyncStorage.getItem("idClient")
        if(value!=null) useId(value)
    }
    const [id,useId]=useState()

    return (
        <View style={{padding: 100, fontSize: 80}}>
            <Text>{id}</Text>
            <Button  
                 title="Learn More"
                 color="#841584"
                 accessibilityLabel="Learn more about this purple button"
                 onPress={deleteStorage}
           />
        </View>
    );
}

{/*
    import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './screens/Main';
import Login from './screens/Login';
import Register from './screens/Register';
import Test from './screens/test';

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    checkStorage();
  }, [isLogged]);

  const checkStorage = async () => {
    let val = await AsyncStorage.getItem("idClient")
    if (val != null) {
      useLogged(true)
    }
  }

  const SetLoggedIn=()=>{
      useLogged(true)
  }

  const [isLogged, useLogged] = useState(false)

  return (
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
        {!isLogged ?<>

          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Login" /*component={Login}  >
            {() => <Login   isLogged={SetLoggedIn}/>}
          </Stack.Screen>
          <Stack.Screen name="Register" component={Register} />
        </>:
        <>
          <Stack.Screen name="Home" component={Test} />
       </>}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

*/}
export default Test;

