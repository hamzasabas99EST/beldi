import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/livreur/HomeScreen';
import DeliveryScreen from '../screens/livreur/DeliveryScreen';
import ProfilScreen from '../screens/livreur/ProfilScreen';

//Screen names
const homeName = "Home";
const delveries = "Restaurants";
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

          } else if (rn === delveries) {
            iconName = focused ? 'restaurant' : 'restaurant-outline';

          } else if (rn === profileName) {
            iconName = focused ? 'person' : 'person-outline';
          }
          /*else if (rn === profileName) {
            iconName = focused ? 'person' : 'person-outline';
          }*/

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#f9ba07',
        tabBarInactiveTintColor: 'grey',
        labelStyle: { paddingBottom: 4, fontSize: 10 },
        tabBarStyle: [
          {
            display: 'flex'
          },
          null
        ]

      })}

    >

      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={delveries} component={DeliveryScreen} />
      <Tab.Screen name={profileName} component={ProfilScreen} />

      {/*<Tab.Screen name={orderName} component={OrderScreen} />
      <Tab.Screen name={profileName} component={ProfileScreen} />*/}

    </Tab.Navigator>
  );
}

export default ButtomNavBar;

