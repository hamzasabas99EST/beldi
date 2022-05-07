import React, { useState } from 'react'
import { StyleSheet, View, Image, Pressable, TextInput, Text, TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth'
import google from '../helpers/google';
import axios from 'axios';
import ip from '../helpers/Ip';
import { Spinner, Icon } from 'native-base'
import validator from 'validator';




const Register = ({navigation}) => {
    
    const [show, setShow] = useState(true);
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [pwd, setPwd] = useState("")
    const [isLoaded, setLoaded] = useState(false)
    const [message, setMessage] = useState("")


    //Cette function permet de créer un nouveau compte
    const newClient = async () => {

        //la vérification des champs 
        if (email == '' || pwd == '' || name == '') setMessage("Vous besoin de remplis les champs")
        else {
            setLoaded(true)
            let isExist = await checkDuplicate(email)
            setTimeout(
                () => {
                    //Avant d'ajouter client je verifie si deja existe dans le bd
                    if (isExist) {
                        setLoaded(false)
                        setMessage("Ce compte dèja existe")
                    }
                    else {
                        const client = {
                            name: name,
                            email: email,
                            pass: pwd
                        }
                        axios.post(ip + "/add", client)
                            .then(res => {
                                init()
                                navigation.push("Login", { msgParam: "Votre compte a été bien créer" })
                            })
                            .catch(err => console.log(err))
                    }
                })
        }
    }

    //Création compte par google
    const signUpWithGoogle = async () => {
        await Google.logInAsync(google)
            .then(res => {
                setName(res.user.name)
                setEmail(res.user.email)
            })
    }

    //Vérifier l'email si correcte
    const checkEmail = (text) => {
        setEmail(text)
        if (validator.isEmail(text)) setMessage("")

        else setMessage("Invalide Email")

    }

    //Cette fonction pour vérifier l'existance d'email dans le bd
    const checkDuplicate = (email) => {

       
        const client = {
            "email": email
        }
        return axios.post(ip + "/logIn", client)
            .then(res => {

                return true
            })
            .catch(() => { return false })


    }

    const init=()=>{
        setEmail("")
        setName("")
        setLoaded(false)
        setPwd("")
        setMessage("")
    }

    return (
        <View style={styles.container}>

            <View style={styles.nav}>
                <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                    <Image style={styles.icon} source={require('../assets/backbold.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.sign}>Sign in</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.desc}>
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.parag}>Lorem ipsum dollor sit ammet, consectetur {"\n"}adipiscing elit, sed do tempor</Text>
            </View>
            <View style={styles.main}>
                {/*Message d'erreur*/}
                {message != "" &&
                    <View style={styles.err}>
                        <Text style={styles.msg}>
                            {message}
                        </Text>
                    </View>
                }
                {/*Input Name*/}
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={text => setName(text)}
                    value={name}
                    autoCapitalize='none'
                />

                {/*Input Email*/}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={text => checkEmail(text)}
                    value={email}
                    autoCapitalize='none'
                />

                {/*Input Password*/}
                <View style={[styles.input, styles.passwd]}>

                    <TextInput
                        secureTextEntry={show}
                        placeholder="Password"
                        onChangeText={text => setPwd(text)}
                        value={pwd}
                    />
                    <Icon
                        name={show ? "eye" : "eye-off"}
                        style={{ color: '#a9a9a9', position: 'absolute', left: '95%', fontSize: 20 }}
                        onPress={() => setShow(!show)}

                    />

                </View>

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.haveacc}>already have an account?</Text>
                </TouchableOpacity>

                {/* Pour créer nouveau client */}
                <Pressable style={styles.btnSignIn} onPress={newClient} disabled={isLoaded}>
                    {!isLoaded ? <Text style={{ color: 'white' }}>Sign Up</Text>
                        : <Spinner color={"#ffffff"} />
                    }
                </Pressable>

                {/* Pour créer nouveau client via google*/}
                <Pressable style={[styles.button, { marginTop: 0 }]} onPress={signUpWithGoogle}>
                    <Image style={[styles.icon, { marginRight: 0 }]} source={require('../assets/google.png')} />
                    <Text style={styles.txtbutton}>Continue with Google</Text>
                    <Image style={[styles.icon, { marginRight: 0 }]} source={require('../assets/flech.png')} />
                </Pressable>
                <Pressable style={styles.button} onPress={() => null}>
                    <Image style={[styles.icon, { marginRight: 0 }]} source={require('../assets/fb.png')} />
                    <Text style={styles.txtbutton}>Continue with Facebook</Text>
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
    sign: {
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
    haveacc: {
        marginTop: 8,
        marginStart: '46%',
        fontSize: 13,
        marginEnd: 24
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
        backgroundColor: "#c00",
        width: '80%',
        borderRadius: 40,
        height: '4%',
        justifyContent: "center"


    },
    msg: {
        textAlign: 'center', // <-- the magic
        fontSize: 15,
        color: "#fff"
    }

});
export default Register;