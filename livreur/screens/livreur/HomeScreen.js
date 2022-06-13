import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'native-base';
import MapView, { Callout, Marker } from 'react-native-maps';
import axios from 'axios';
import ip from '../../helpers/ip';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import * as Location from 'expo-location';


const HomeScreen = ({ navigation }) => {

    const [coordsLivreur, setCoordsLivreur] = useState()
    const [commandes, setCommandes] = useState([])
    const prevCoords = usePrevious(coordsLivreur)
    const refMap = useRef(null)


    useEffect(() => {
        navigation.addListener('focus', () => getCommandesLivreur())

        let interval = setInterval(() => getLivreurLocation(prevCoords), 1000 * 60)

        return () => clearInterval(interval)

    }, [])

    const getCommandesLivreur = async () => {
        let id = await AsyncStorage.getItem("idLivreur")

        axios.get(ip + `/Commandes/${id}`)
            .then(async res => {
                await setCommandes(res.data.commandes)
                let { latitudeL, longitudeL } = res.data.livreur

                if (latitudeL && longitudeL) {
                    SetCoords(latitudeL, longitudeL)
                } else getLivreurLocation(coordsLivreur)




            })
    }


    const getCity = async (lat, long) => {

        if (lat && long) {
            let response = await Location.reverseGeocodeAsync({
                "latitude": lat,
                "longitude": long
            })

            return response[0].city
        }

        return ''
    }


    const getLivreurLocation = async (coordL) => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return
        }

        let { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });

        if (coordL != coords) {
            SetCoords(coords.latitude, coords.longitude)

            let id = await AsyncStorage.getItem("idLivreur")
            let city = await getCity(coords.latitude, coords.longitude)

            await axios.post(ip + `/updateCoords/${id}`, { lat: coords.latitude, long: coords.longitude, city })
                .then()
                .catch(err => console.log(err.response))

        }

    }

    const SetCoords = (lat, long) => {
        setCoordsLivreur({
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5
        })
        refMap.current.animateCamera({
            center: {
                latitude: lat,
                longitude: long,

            },
            zoom: 5,
            heading: 0,
            pitch: 0,
            altitude: 5

        })
    }




    return (
        <Container>
            {
                <MapView
                    style={{ flex: 1 }}
                    ref={refMap}


                //  onPress={e=>console.log(e.nativeEvent.coordinate)}
                >
                    {coordsLivreur && <Marker coordinate={coordsLivreur} >
                        <Image source={require("../../assets/livreur.png")} resizeMode="center"/>

                    </Marker>}

                    {commandes.map(commande => {
                        let image = ""
                        if (commande.status == "taken") image = require("../../assets/taken.png")
                        if (commande.status == "processing") image = require("../../assets/processing.png")
                        else if (commande.status == "on the road") image = require("../../assets/road.png")



                        return (
                            <Marker
                                key={commande._id}
                                coordinate={
                                    {
                                        "latitude": commande.client.latitude,
                                        "longitude": commande.client.longitude
                                    }
                                }

                            >


                                <Image source={image} />



                                <Callout tooltip key={commande._id}>
                                    <Pressable onPress={() => navigation.push('Details', { "id": commande._id, "name": commande.client.name })}>
                                        <View style={style.Container}>
                                            <Text>{commande.client.name}</Text>
                                            <Icon
                                                name="information-circle-outline"
                                                type='ionicon'
                                            />
                                        </View>
                                    </Pressable>
                                </Callout>


                            </Marker>
                        )
                    }
                    )
                    }


                </MapView>}
        </Container>
    );
}

const usePrevious = (value) => {
    const ref = useRef()

    useEffect(() => {
        ref.current = value
    }, [value])

    return ref.current
}

const style = StyleSheet.create({
    Container: {
        width: 120,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-around",
        backgroundColor: "#fff",
        padding: 5

    }
})

export default HomeScreen;