import React, { useState, useEffect, useMemo } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './helpers/auth';
import Login from './screens/Login';
import Livreur from './screens/livreur/Livreur';
import DetailsDileveryScreen from './component/DetailsDileveryScreen';
import Tips from './component/Tips';
import MyDeliveries from './screens/livreur/MyDeliveries';
import AboutUs from './screens/livreur/AboutUs';


const Stack = createNativeStackNavigator();

const App = () => {

  const logcontext = useMemo(() => ({
    logout: () => {
      useLogged(false)
    }
  }))
  const [isLogged, useLogged] = useState(false)
  const [onBoarded, setOnboarded] = useState(false)


  useEffect(() => {
    isVisited();
    checkStorage();
  }, []);

  const isVisited = async () => {

    let first = await AsyncStorage.getItem("Visited");
    first ? setOnboarded(false) : setOnboarded(true)

    //console.log(onBoarded)
  }
  const checkStorage = async () => {
    let val = await AsyncStorage.getItem("idLivreur")
    if (val != null) {
      useLogged(true)
    }
  }


  const SetLoggedIn = () => {
    useLogged(true)
  }

  if (onBoarded) {
    return (
      <Tips closed={()=>setOnboarded(false)}></Tips>
    );
  }

  return (
    <AuthContext.Provider value={logcontext}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >


          {!isLogged ? <>
            <Stack.Screen name="Login" >
              {(props) => <Login {...props} isLogged={SetLoggedIn} />}
            </Stack.Screen>
          </> :
            <>
              <Stack.Screen name="Livreur" component={Livreur} />
              <Stack.Screen name="Details" component={DetailsDileveryScreen} />
              <Stack.Screen name="Tips" component={Tips} />
              <Stack.Screen name="delivries" component={MyDeliveries} />
              <Stack.Screen name="About" component={AboutUs} />

            </>

          }

        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
