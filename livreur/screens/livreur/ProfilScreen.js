import React, {  useEffect, useState,useContext } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, Pressable, ActivityIndicator } from 'react-native';
import { Icon } from 'native-base'
import axios from 'axios';
import ip from '../../helpers/ip';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfilScreen = ({ navigation }) => {

    const [profil, setProfil] = useState()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let id = await AsyncStorage.getItem("idClient")
        axios.get(ip + `/getClient/${id}`)
            .then(async res => await setProfil(res.data))


    }

    const Logout = () => {
        setLoading(true)
        setTimeout(async () => {
            try {

                await AsyncStorage.clear()
                await logout()
                navigation.navigate("Main")
            } catch (exception) {
                alert("no")
            }


        }, 2000)
    }



    return (
        <View style={styles.container}>

            {isLoading ?

                <ActivityIndicator
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    size='large'
                    color={"black"}
                />
                : <>
                    <View style={styles.gold}>
                        <Image style={styles.Img} source={require('../../assets/uprofil.png')} />
                        <Pressable
                            style={styles.iconPress}
                            onPress={() => { alert("Edit Photo") }}
                        >
                            <Icon
                                name='camera'
                                style={styles.icon}
                            />
                        </Pressable>
                        <Text style={styles.bold}>Mohamed Taoufiki</Text>
                        <Text style={styles.email}>sim.taoufiki@gmail.com</Text>
                        <Pressable
                            style={styles.btnPress}
                            onPress={() => { alert("Edit Profil") }}
                        >
                            <Text>Edit Profil</Text>
                        </Pressable>
                    </View>
                    <View style={{ position: "relative", marginTop: 25 }}>

                        <View style={styles.line}></View>

                        <Pressable onPress={() => navigation.push("MyOrders")}>
                            <View style={styles.card}>
                                <Text style={styles.cmdText}>Order History</Text>
                                <Icon
                                    name='cart'
                                    style={styles.icon}
                                />

                            </View>
                        </Pressable>
                        <View style={styles.line}></View>
                        <Pressable onPress={() => Logout()}>
                            <View style={styles.card}>
                                <Text style={styles.cmdText}>About Us</Text>
                                <Icon
                                    name='information-circle'
                                    style={styles.icon}
                                />

                            </View>
                        </Pressable>
                        <View style={styles.line}></View>

                        <Pressable onPress={() => Logout()}>
                            <View style={styles.card}>
                                <Text style={styles.cmdText}>Logout</Text>
                                <Icon
                                    name='log-out'
                                    style={styles.icon}
                                />

                            </View>
                        </Pressable>
                        <View style={styles.line}></View>


                    </View>
                </>}
        </View >
    );
}

const styles = StyleSheet.create({
    line: {
        borderWidth: 0.5,
        borderColor: "#f5e4f5"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    Img: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginTop: 40
    },
    iconPress: {
        backgroundColor: '#f8f2f2',
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        top: -28,
        left: 28,
        borderWidth: 2,
        borderColor: 'white'
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 20,
        top: -20
    },
    email: {
        top: -20
    },
    btnPress: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20,
        width: 90,
        padding: 4,
        alignItems: 'center'
    },
    card: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width,
        paddingLeft: 25,
        paddingRight: 30
    },
    cmdText: {
        fontSize: 16,
    },
    iconBag: {
        color: '#f9ba07',
        marginEnd: 20
    },
    btnPressed: {
        flexDirection: 'row',
        alignItems: 'center',
        position: "absolute",
        bottom: -15

    },
    gold: {
        backgroundColor: '#f9ba07',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2 - 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        
    },
})

export default ProfilScreen;

