import React from 'react'
import {StyleSheet,View,Image,Dimensions} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash=()=> {
  const navigate = useNavigation();
  setTimeout(async()=>{
    let id=await AsyncStorage.getItem("idClient")
    if(id) navigate.navigate("Client")
    else if(id==null)  navigate.navigate("Main")

  },
     5000
  )
  return (
    <View style={styles.container}>
        <LottieView source={require('../assets/background.json')} autoPlay loop />
        <Image style={styles.image} source={require('../assets/tajine_.png')}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
        
      },
    image: {
        width:Dimensions.get('window').width-50,
        height:200
    }
});
export default Splash;