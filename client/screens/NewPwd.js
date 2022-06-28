import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Pressable, TextInput, Text } from 'react-native';
import { Icon } from "native-base";


import ip from '../helpers/Ip';
import { Spinner } from 'native-base'

import axios from 'axios';


const NewPwd = ({ navigation, route }) => {

    useEffect(() => {

        setEmail(emailParam)
    })

    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [isLoaded, setLoaded] = useState(false)
    const [pwd, setPwd] = useState("")
    const [show, setShow] = useState(true);
    const [show1, setShow1] = useState(true);



    const { emailParam } = route.params;

    const UpdatePwd = (e) => {
        e.preventDefault();
        setLoaded(true)
        setTimeout(() => {
            let user = {
                "email": email,
                "pass": pwd
            }
            axios.post(ip + "/UpdatePwd", user)
                .then(res => {
                    setLoaded(false)
                    navigation.replace("Login", { msgParam: res.data })
                })
                .catch(err => {
                    console.log(err.response)
                    setLoaded(false)
                })
        }, 2000)


    }

    const checkPwd = (a) => {
        if (a != pwd) {
            setMessage("Mote de passe no correspond pas")
        } else setMessage("")
    }




    return (
        <View style={styles.container}>


            {/*Title*/}
            <View style={styles.desc}>
                <Text style={styles.title}>Modifier votre  Mot de passe</Text>
                <Text style={styles.parag}> Votre Email est :  <Text style={{ fontWeight: 'bold' }} > {email}</Text> </Text>

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

                <View style={[styles.input, styles.passwd]}>

                    <TextInput
                        placeholder="Nouveau Mot de passe" value={pwd}
                        onChangeText={(text) => setPwd(text)}
                        autoCapitalize='none'
                        secureTextEntry={show}
                        placeholderTextColor={"gray"}


                    />
                    <Icon
                        name={show ? "eye" : "eye-off"}
                        style={{ color: '#a9a9a9', position: 'absolute', left: '95%', fontSize: 20 }}
                        onPress={() => setShow(!show)}

                    />
                </View>
                <View style={[styles.input, styles.passwd]}>
                    <TextInput
                        placeholder="Confirmer Mot de passe"
                        onChangeText={text => checkPwd(text)}
                        autoCapitalize='none'
                        secureTextEntry={show1}
                        placeholderTextColor={"gray"}

                    />
                    <Icon
                        name={show1 ? "eye" : "eye-off"}
                        style={{ color: '#a9a9a9', position: 'absolute', left: '95%', fontSize: 20 }}
                        onPress={() => setShow1(!show1)}

                    />


                </View>

                {/*Button sign IN normal*/}

                <Pressable style={styles.btnSignIn} onPress={UpdatePwd} disabled={isLoaded}>
                    {!isLoaded ? <Text style={{ color: 'white' }}>Modifier</Text>
                        : <Spinner color={"#ffffff"} />
                    }

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
        marginTop: 50,
        marginEnd: 35
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 20,
        textAlign: "left"
    },
    parag: {
        fontSize: 15,
    },
    main: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        marginTop: 50,
        borderRadius: 40,
        alignItems: 'center',
        paddingTop: 40
    },
    input: {
        width: '80%',
        height: 50,
        marginTop: 30,
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
        height: '6%',
        justifyContent: "center",
        opacity: 0.5


    },
    msg: {
        textAlign: 'center',
        fontSize: 15,
        color: "white"
    }
});
export default NewPwd;