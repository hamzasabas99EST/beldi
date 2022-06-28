import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, Pressable, TextInput, TouchableOpacity, Text } from 'react-native';
import ip from '../helpers/Ip';
import { Spinner, Icon } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-google-app-auth'
import google from '../helpers/google';
import validator from 'validator';

import axios from 'axios';


const Login = (props) => {
    const { navigation, route, isLogged } = props
    const [show, setShow] = useState(true);

    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [isLoaded, setLoaded] = useState(false)
    const [message, setMessage] = useState("")
    const { msgParam } = route.params;

    useEffect(() => {
        if (msgParam) {

            setMessage(msgParam)
        }

    }, [])


    //Cette fonction pour authentifier par email et mot  de passe
    const SignIn = (e) => {

        if (email == '' || pwd == '') setMessage("Email and password required")
        else {
            e.preventDefault();
            setLoaded(true)

            setTimeout(
                () => {
                    const user = {
                        email: email,
                        pass: pwd
                    }
                    axios.post(ip + "/logEmailPwd", user)
                        .then(async res => {
                            setLoaded(false)
                            await AsyncStorage.setItem('idClient', res.data)
                            await isLogged();
                            navigation.navigate("Client")
                        })
                        .catch(err => {
                            setLoaded(false)
                            setMessage(err.response.data.message)
                        })
                }
                , 2000)
        }
        /*
        
       */

    }

    //Cette fonction pour authentifier via google
    const SignInWithGoogle = async () => {


        Google.logInAsync(google)
            .then(async res => {
                const user = {
                    email: res.user.email
                }
                await axios.post(ip + "/logIn", user)
                    .then(async res => {
                        await AsyncStorage.setItem('idClient', res.data)
                        await isLogged();
                        await navigation.navigate("Client")

                    })
                    .catch(err => {
                        setLoaded(false)
                        setMessage(err.response.data.message)
                    })
            })
            .catch(err => console.log("error"))

    }

    //la verifiction syntaxe d'email
    const checkEmail = (text) => {
        setEmail(text)
        if (validator.isEmail(text)) setMessage("")

        else setMessage("Invalide Email")

    }

    const init = () => {
        setEmail("")
        setLoaded(false)
        setPwd("")
        setMessage("")
    }


    return (
        <View style={styles.container}>

            {/*head*/}
            <View style={styles.nav}>
                <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                    <Image style={styles.icon} source={require('../assets/backbold.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { init(); navigation.navigate("Register") }}>
                    <Text style={styles.reg}>Register</Text>
                </TouchableOpacity>
            </View>
            {/*Title*/}
            <View style={styles.desc}>
                <Text style={styles.title}>Sign In</Text>
                <Text style={styles.parag}>Lorem ipsum dollor sit ammet, consectetur {"\n"}adipiscing elit, sed do tempor</Text>
            </View>
            <View style={styles.main}>
                {/*Message d'erreur*/}
                {!message == "" &&
                    <View style={[styles.err, (msgParam && message == msgParam) && { backgroundColor: "#1cc88a" }]} >
                        <Text style={styles.msg}>
                            {message}
                        </Text>
                    </View>
                }

                {/*Input email*/}
                <TextInput style={styles.input}
                    placeholder="Email" value={email}
                    onChangeText={(text) => checkEmail(text)}
                    autoCapitalize='none'
                    placeholderTextColor={"gray"}
                />

                {/*Input password*/}
                <View style={[styles.input, styles.passwd]}>
                    <TextInput
                        secureTextEntry={show}
                        value={pwd}
                        onChangeText={(text) => setPwd(text)} placeholder="Password" 
                    placeholderTextColor={"gray"}
                    />
                    <Icon
                        name={show ? "eye" : "eye-off"}
                        style={{ color: '#a9a9a9', position: 'absolute', left: '95%', fontSize: 20 }}
                        onPress={() => setShow(!show)}

                    />
                </View>

                {/*Mot de passse oublié*/}
                <Text style={styles.forgot} onPress={() => navigation.navigate("Reset")}>Forgot Password?</Text>

                {/*Button sign IN normal*/}

                <Pressable style={styles.btnSignIn} onPress={SignIn} disabled={isLoaded}>
                    {!isLoaded ? <Text style={{ color: 'white' }}>Sign In</Text>
                        : <Spinner color={"#ffffff"} />
                    }

                </Pressable>

                {/*Button sign IN with google*/}
                <Pressable style={[styles.button, { marginTop: 50 }]} onPress={SignInWithGoogle}>
                    <Image style={[styles.icon, { marginRight: 0 }]} source={require('../assets/google.png')} />
                    <Text style={styles.txtbutton}>Continue with Google</Text>
                    <Image style={[styles.icon, { marginRight: 0 }]} source={require('../assets/flech.png')} />
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
    nav: {
        flexDirection: 'row',
        marginTop: 60
    },
    reg: {
        fontWeight: 'bold',
        fontSize: 16
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 230
    },
    desc: {
        marginTop: 40,
        marginEnd: 35
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 14
    },
    parag: {
        fontWeight: '900'
    },
    main: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        marginTop: 30,
        borderRadius: 40,
        alignItems: 'center',
        paddingTop: 40
    },
    input: {
        width: '80%',
        height: 50,
        marginTop: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 30,
        paddingStart: 30
    },
    forgot: {
        marginTop: 8,
        marginStart: '46%',
        fontSize: 13
    },
    btnSignIn: {
        backgroundColor: 'black',
        width: '80%',
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20
    },
    button: {
        flexDirection: 'row',
        width: '80%',
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#f1f1f1'
    },
    txtbutton: {
        marginLeft: 25,
        marginRight: 25
    },
    passwd: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    err: {
        backgroundColor: "#dc3545",
        width: 300,
        borderRadius: 40,
        height: 30,
        justifyContent: "center",


    },
    msg: {
        textAlign: 'center', // <-- the magic
        fontSize: 13,
        color: "#fff",
        padding: 5
    }
});
export default Login;