import React from 'react'
import {StyleSheet,View,Text,Pressable,Image} from 'react-native';
import { useNavigation } from "@react-navigation/native";

const Main=()=> {
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/deliver.png')}/>
        <View style={styles.main}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.parag}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
            <View style={styles.btncontainer}>
                <Pressable style={styles.btnSignIn} onPress={()=>navigate.navigate("Login", { repo: 'item' })}>
                    <Text style={{color:'white'}}>Sign In</Text>
                </Pressable>
                <Pressable style={[styles.btnSignIn,{backgroundColor:'#fffeff'}]} onPress={()=>navigate.navigate("Register", { repo: 'item' })}>
                    <Text>Sign Up</Text>
                </Pressable>
            </View>
            
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        alignItems:'center',
    },
    main:{
        backgroundColor:'#f9ba07',
        width:'100%',
        height:'50%',
        borderRadius:40,
        paddingTop:50,
        paddingStart:20,
        paddingEnd:20
    }, 
    title:{
        fontWeight:'bold',
        fontSize:30,
        marginBottom:14
     },
     parag:{
        fontWeight:'900'
    },
    btnSignIn:{
        backgroundColor:'black',
        width:'48%',
        height:50,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
    },
    btncontainer:{
        flexDirection:'row',
        marginTop:60,
        justifyContent:'space-between'
    },
    image:{
        width:60,
        height:60,
        marginTop:'100%'
    }
});
export default Main;