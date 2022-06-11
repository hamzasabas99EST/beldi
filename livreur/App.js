import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './screens/Login';
import Livreur from './screens/livreur/Livreur';
import DetailsDileveryScreen from './component/DetailsDelivery';


const Stack = createNativeStackNavigator();

const App = () => {

  const [isLogged, useLogged] = useState(false)


  useEffect(() => {
    checkStorage();
  }, []);

  const checkStorage = async () => {
    let val = await AsyncStorage.getItem("idLivreur")
    if (val != null) {
      useLogged(true)
    }
  }

  const SetLoggedIn = () => {
    useLogged(true)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >


        {!isLogged ? <>
          <Stack.Screen name="Login" initialParams={{ msgParam: null }}>
            {(props) => <Login {...props} isLogged={SetLoggedIn} />}
          </Stack.Screen>
        </> :
          <>
            <Stack.Screen name="Livreur" component={Livreur} />
            <Stack.Screen name="Details" component={DetailsDileveryScreen} />

          </>

        }

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
