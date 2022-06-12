import React, { useState, useEffect, useMemo } from 'react'
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
import MyOrders from './screens/client/MyOrders';
import { AuthContext } from './helpers/auth';

const Stack = createNativeStackNavigator();

const App = () => {

  const logcontext = useMemo(() => ({
    logout: () => {
      useLogged(false)
    }
  }))

  const [isLogged, useLogged] = useState(false)



  useEffect(() => {
    checkStorage();
  }, [isLogged]);

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
    <AuthContext.Provider value={logcontext}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Splash" component={Splash} />
          {!isLogged ? <>
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
              <Stack.Screen name="MyOrders" component={MyOrders} />


            </>

          }

        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>

  );
}

export default App;
