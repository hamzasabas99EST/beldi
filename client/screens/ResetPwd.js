import React, { useState } from 'react'
import { StyleSheet, View, Pressable, TextInput, Text } from 'react-native';
import ip from '../helpers/Ip';
import { Spinner } from 'native-base'
import validator from 'validator';


import axios from 'axios';


const ResetPwd = ({ navigation }) => {


    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")

    //cette state pour changer la valeur du button
    const [action, setAction] = useState("Envoyer")

    //Pour récupérer le code envoyer via le serveur
    const [tempCode, setTmpCode] = useState("")
    const [isLoaded, setLoaded] = useState(false)

    //Pour disable l'input de code 
    const [etat, setEtat] = useState(false)

    // 
    const [err, setErr] = useState(false)
    const [message, setMessage] = useState("")


    const Action = (e) => {
        e.preventDefault();
        setLoaded(true)
        setTimeout(() => {


            if (action == "Envoyer") {
                let user = {
                    email: email
                }
                axios.post(ip + "/CodeConfirmation", user)
                    .then(res => {
                        setLoaded(false)
                        setEtat(true)
                        setAction("Confirmer")
                        setTmpCode(res.data.code)
                        setMessage(res.data.message)

                    })
                    .catch(err => {
                        setLoaded(false)
                        setErr(true)
                        setMessage(err.response.data.message)
                    })
            } else {
                if (tempCode != code) {
                    setErr(true)
                    setLoaded(false)
                    setMessage("Incorrect Code ")


                }
                else
                    navigation.navigate("NewPwd", { emailParam: email })


            }
        }, 2000)


    }
    const checkEmail = (text) => {
        setEmail(text)
        if (validator.isEmail(text)) {
            setErr(false)

            setMessage("")

        }

        else {
            setErr(true)

            setMessage("Invalide Email")
        }

    }



    return (
        <View style={styles.container}>


            {/*Title*/}
            <View style={styles.desc}>
                <Text style={styles.title}>Retrouver Votre compte</Text>
                <Text style={styles.parag}>Lorem ipsum dollor sit ammet, consectetur {"\n"}adipiscing elit, sed do tempor</Text>
            </View>
            <View style={styles.main}>
                {/*Message d'erreur*/}
                {message != "" &&
                    <View style={[styles.err, err && { backgroundColor: "#dc3545" }]} >

                        <Text style={styles.msg}>
                            {message}
                        </Text>
                    </View>
                }
                {!etat ?
                    <TextInput style={styles.input}
                        placeholder="Email" value={email}
                        onChangeText={(text) => checkEmail(text)}
                        autoCapitalize='none'
                        placeholderTextColor={"gray"}

                    />
                    :
                    <View style={[styles.input, styles.passwd]}>
                        <TextInput
                            value={code}
                            onChangeText={(text) => setCode(text)}
                            placeholder="Code : XXXXXX"
                            keyboardType="numeric"
                            editable={etat}
                            maxLength={6}
                            placeholderTextColor={"gray"}

                        />

                    </View>}

                {/*Button sign IN normal*/}

                <Pressable style={styles.btnSignIn} onPress={Action} disabled={isLoaded}>
                    {!isLoaded ? <Text style={{ color: 'white' }}>{action}</Text>
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
        fontSize: 30,
        marginBottom: 20,
        textAlign: "left"
    },
    parag: {

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
        backgroundColor: "#1cc88a",
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
export default ResetPwd;