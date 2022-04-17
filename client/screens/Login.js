import React from 'react'
import {StyleSheet,View,Image,Pressable,TextInput,Text} from 'react-native';

const Login=()=> {
  return (
    <View style={styles.container}>
        <View style={styles.nav}>
            <Image style={styles.icon} source={require('../assets/backbold.png')}/>
            <Text style={styles.reg}>Register</Text>
        </View>
        <View style={styles.desc}>
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.parag}>Lorem ipsum dollor sit ammet, consectetur {"\n"}adipiscing elit, sed do tempor</Text>
        </View>
        <View style={styles.main}>
            <TextInput style={styles.input} placeholder="Username"/>
            <TextInput style={styles.input} placeholder="Password"/>
            <Text style={styles.forgot}>Forgot Password?</Text>
            <Pressable style={styles.btnSignIn} onPress={()=>null}>
                <Text style={{color:'white'}}>Sign In</Text>
            </Pressable>
            <Pressable style={[styles.button, {marginTop:50}]} onPress={()=>null}>
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
        }
});
export default Login;