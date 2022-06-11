import React from 'react'
import {StyleSheet,View,Image,Dimensions} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import LottieView from 'lottie-react-native';

const Splash=()=> {
  const navigate = useNavigation();
  setTimeout(()=>{},
     10000
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