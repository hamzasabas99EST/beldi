import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Main from './screens/Main';
import Login from './screens/Login';
import Register from './screens/Register';
import Client from './screens/client/Client';
import ResetPwd from './screens/ResetPwd'
import NewPwd from './screens/NewPwd'
import RestFood from './screens/client/RestFood';
import Splash from './screens/Splash';


const Stack = createNativeStackNavigator();

const App = () => {

  const [isLogged, useLogged] = useState(false)


  useEffect(() => {
    checkStorage();
  }, []);

  const checkStorage = async () => {
    let val = await AsyncStorage.getItem("idClient")
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
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Login" initialParams={{ msgParam: null }}>
            {(props) => <Login {...props} isLogged={SetLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Reset" component={ResetPwd} />
          <Stack.Screen name="NewPwd" component={NewPwd} />
        </> :
          <>
            <Stack.Screen name="Client" component={Client} />
            <Stack.Screen name="RestFood" component={RestFood} />
           
          </>

        }

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
