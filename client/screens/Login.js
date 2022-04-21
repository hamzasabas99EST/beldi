import React,{useState} from 'react'
import {StyleSheet,View,Image,Pressable,TextInput,TouchableOpacity,Text} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ip from '../helpers/Ip';
import * as Google from 'expo-google-app-auth'

import axios  from 'axios';


const Login=()=> {
    const navigate = useNavigation();
    const [isSecureEntry,setSecureEntry]=useState(true);

    const [email,useEmail]=useState("")
    const [pwd,usePwd]=useState("")

    const SignIn=(e)=>{
        e.preventDefault();
        const user={
            email:email,
            pass:pwd
        }
         axios.post(ip+"/clients/logEmailPwd",user)
        .then(res=>alert(res.data))
        .catch(err=>console.log(err))
       
 
    }

    const SignInWithGoogle=async()=>{
        const result=await Google.logInAsync({
            androidClientId:"378979646433-pk1t3egfjms74ev843ep8cjksgg0lso8.apps.googleusercontent.com",
            iosClientId:"378979646433-lcls7a11ihnf5ge82roei2c5dr15flgd.apps.googleusercontent.com",
            scope:["profile","email"]
        });

        if(result.type="success"){
           const user={
               email:result.user.email
           }
           await axios.post(ip+"/clients/logIn",user)
           .then(res=>console.log(res.data))
           .catch(err=>alert(err))

        }

    }

  return (
    <View style={styles.container}>

        {/*head*/}
        <View style={styles.nav}>
            <TouchableOpacity onPress={()=>navigate.navigate("Main", { repo: 'item' })}>
                <Image style={styles.icon} source={require('../assets/backbold.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate.navigate("Register", { repo: 'item' })}>
                <Text style={styles.reg}>Register</Text>
            </TouchableOpacity>
        </View>
        {/*Title*/}
        <View style={styles.desc}>
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.parag}>Lorem ipsum dollor sit ammet, consectetur {"\n"}adipiscing elit, sed do tempor</Text>
        </View>
        <View style={styles.main}>
            <TextInput style={styles.input} 
                placeholder="Email" value={email}
                onChangeText={(text)=>useEmail(text)}
            />

            <View style={[styles.input,styles.passwd]}>
                <TextInput secureTextEntry={isSecureEntry} value={pwd} onChangeText={(text)=>usePwd(text)} placeholder="Password"/>
                <TouchableOpacity
                        style={{position:'absolute',left:'95%'}}
                        onPress={()=>{
                            setSecureEntry((pre)=>!pre);
                        }}
                        >
                        {
                            isSecureEntry?<Image style={styles.icon} source={require('../assets/eye0.png')}/>:<Image style={styles.icon} source={require('../assets/eye1.png')}/>
                        }
                    </TouchableOpacity>
            </View>
            <Text style={styles.forgot}>Forgot Password?</Text>
            <Pressable style={styles.btnSignIn} onPress={SignIn}>
                <Text style={{color:'white'}}>Sign In</Text>
            </Pressable>
            <Pressable style={[styles.button, {marginTop:50}]} onPress={SignInWithGoogle}>
                <Image style={[styles.icon, {marginRight:0}]} source={require('../assets/google.png')}/>
                <Text style={styles.txtbutton}>Continue with Google</Text>
                <Image style={[styles.icon, {marginRight:0}]} source={require('../assets/flech.png')}/>
            </Pressable>
            <Pressable style={styles.button} onPress={()=>null}>
                <Image style={[styles.icon, {marginRight:0}]} source={require('../assets/fb.png')}/>
                <Text style={styles.txtbutton}>Continue with Facebook</Text>
                <Image style={[styles.icon, {marginRight:0}]} source={require('../assets/flech.png')}/>
            </Pressable>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9ba07',
        alignItems: 'center',
      },
      nav:{
        flexDirection:'row',
        marginTop:60
      },
      reg:{
        fontWeight:'bold',
        fontSize:16
      },
      icon:{
          width:20,
          height:20,
          marginRight:230
      },
      desc:{
          marginTop:40,
          marginEnd:35
        },
        title:{
           fontWeight:'bold',
           fontSize:30,
           marginBottom:14
        },
        parag:{
            fontWeight:'900'
        },
        main:{
            backgroundColor:'white',
            width:'100%',
            height:'100%',
            marginTop:30,
            borderRadius:40,
            alignItems:'center',
            paddingTop:40
        }, 
        input:{
            width:'80%',
            height:50,
            marginTop:8,
            backgroundColor:'#f5f5f5',
            borderRadius:30,
            paddingStart:30
        },
        forgot:{
            marginTop:8,
            marginStart:'46%',
            fontSize:13
        },
        btnSignIn:{
            backgroundColor:'black',
            width:'80%',
            height:50,
            borderRadius:30,
            justifyContent:'center',
            alignItems:'center',
            marginTop:40,
            marginBottom:20
        },
        button:{
            flexDirection:'row',
            width:'80%',
            height:50,
            borderRadius:30,
            justifyContent:'center',
            alignItems:'center',
            marginBottom:8,
            borderWidth:1,
            borderColor:'#f1f1f1'
        },
        txtbutton:{
            marginLeft:25,
            marginRight:25
        },
        passwd:{
            flexDirection:'row',
            alignContent:'center',
            alignItems:'center'
        }
});
export default Login;