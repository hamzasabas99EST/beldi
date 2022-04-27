import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './screens/Main';
import Login from './screens/Login';
import Register from './screens/Register';
import Client from './screens/client/Client';
import ResetPwd from './screens/ResetPwd'
import NewPwd from './screens/NewPwd'



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="Login" component={Login} initialParams={{msgParam:null}}/>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Reset" component={ResetPwd} />
        <Stack.Screen name="NewPwd" component={NewPwd} />

        <Stack.Screen name="Client" component={Client}/>
      </Stack.Navigator>
  </NavigationContainer>
  );
}
