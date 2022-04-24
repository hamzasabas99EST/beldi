import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/client/HomeScreen';
import TrackScreen from '../screens/client/TrackScreen';
import OrderScreen from '../screens/client/OrderScreen';
import ProfileScreen from '../screens/client/ProfileScreen';

//Screen names
const homeName = "Home";
const trackName = "Track";
const orderName = "Order";
const profileName = "Profil";

const Tab = createBottomTabNavigator();

function ButtomNavBar() {
  return (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === trackName) {
              iconName = focused ? 'analytics' : 'analytics-outline';

            } else if (rn === orderName) {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }
            else if (rn === profileName) {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false
        })}
        tabBarOptions={{
          activeTintColor: '#f9ba07',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 4, fontSize: 10 },
          tabBarStyle:[
            {
              display:'flex'
            },
            null
          ]
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={trackName} component={TrackScreen} />
        <Tab.Screen name={orderName} component={OrderScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />

      </Tab.Navigator>
  );
}

export default ButtomNavBar;

