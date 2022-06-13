import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Image, Pressable, TextInput, TouchableOpacity, Text } from 'react-native';
import { Spinner, Icon } from 'native-base'
import axios from 'axios';
import ip from '../helpers/ip';


const Login = props => {

    const [show, setShow] = useState(true);

    const [username, setUsername] = useState("")
    const [pwd, setPwd] = useState("")
    const [isLoaded, setLoaded] = useState(false)
    const [message, setMessage] = useState("")

    const signIn = () => {
        setLoaded(true)
        setTimeout(() => {
            const livreur = {
                username: username,
                pass: pwd
            }
            axios.post(ip + "/login", livreur)
                .then(async res => {
                    if (res.status == 200) {

                        setLoaded(false)
                        await AsyncStorage.setItem('idLivreur', res.data)
                        await props.isLogged();
                        props.navigation.navigate("Livreur")
                    }


                })
                .catch(err => {setLoaded(false); setMessage(err.response.data.message)})
        }, 2000)

    }

    return (
        <View style={styles.container}>

            {/*head*/}
            <View style={styles.nav}>
               
                <TouchableOpacity >
                    <Text style={styles.reg}>BELDI</Text>
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
                    <View style={styles.err} >
                        <Text style={styles.msg}>
                            {message}
                        </Text>
                    </View>
                }

                {/*Input username*/}
                <TextInput style={styles.input}
                    placeholder="Username" value={username}
                    onChangeText={text => setUsername(text)}
                    autoCapitalize='none'
                />

                {/*Input password*/}
                <View style={[styles.input, styles.passwd]}>
                    <TextInput
                        secureTextEntry={show}
                        value={pwd}
                        onChangeText={(text) => setPwd(text)}
                        placeholder="Password" />
                    <Icon
                        name={show ? "eye" : "eye-off"}
                        style={{ color: '#a9a9a9', position: 'absolute', left: '95%', fontSize: 20 }}
                        onPress={() => setShow(!show)}

                    />
                </View>

                {/*Mot de passse oublié*/}
                <Text style={styles.forgot} >Forgot Password?</Text>

                {/*Button sign IN normal*/}

                <Pressable style={styles.btnSignIn} onPress={signIn} disabled={isLoaded}>
                    {!isLoaded ? <Text style={{ color: 'white' }}>Sign In</Text>
                        : <Spinner color={"#ffffff"} />
                    }

                </Pressable>


            </View>

        </View>
    );
};

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

export default Login;