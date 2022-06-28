import { React, useRef, useEffect, useState } from 'react';
import { Container } from 'native-base';
import { StyleSheet, View, Text } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps';
import { Image } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import ip from '../../helpers/Ip';
import AsyncStorage from '@react-native-async-storage/async-storage';




const TrackScreen = (props) => {

    const { navigation } = props

    const refMap = useRef(null)

    const [coordinatesClient, setCoordinatesClient] = useState();
    const [Datalivreur, setDataLivreur] = useState();


    useEffect(() => {
        navigation.addListener('focus', async () => checkCommande())


    }, [])

    const checkCommande = async () => {
        var id = await AsyncStorage.getItem("idClient")
        let date = new Date()
        await axios.get(ip + `/commande/get/${id}/${date}`)
            .then(async res => {
                if (res.status == 200) {
                    let { latitude, longitude } = res.data.client
                    if (latitude && longitude) {
                        SetCoords(latitude, longitude)
                    } else getUserLocation(latitude, longitude)


                    await setDataLivreur(res.data.livreur)

                }
            })
            .catch(err => getUserLocation(0, 0))


    }

    const getUserLocation = async (latitude, longitude) => {

        let client = { latitude, longitude }

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return
        }

        let { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });

        if (coords != client) {

            SetCoords(coords.latitude, coords.longitude)
            await updateLocationClient(coords.latitude, coords.longitude)
        }


    }

    const SetCoords = (lat, long) => {
        setCoordinatesClient({
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

    const updateLocationClient = async (latitude, longitude) => {

        var id = await AsyncStorage.getItem("idClient")
        axios.post(ip + `/updateClientLocation/${id}`, { "latitude": latitude, "longitude": longitude })
            .then(res => { })
            .catch(err => console.log(err))

    }






    return (

        <Container>

            <MapView
                style={{ flex: 1 }}
                initialRegion={coordinatesClient}
                ref={refMap}
                mapType="mutedStandard"
            >
                {coordinatesClient &&
                    <Marker
                        coordinate={coordinatesClient}
                        title="Your Localisation"
                    >

                        <Image source={require("../../assets/client.png")} resizeMode="center" />
                    </Marker>

                }

                {Datalivreur &&
                    <Marker
                        coordinate={
                            {
                                "latitude": Datalivreur.latitudeL,
                                "longitude": Datalivreur.longitudeL
                            }

                        }
                        title={Datalivreur.name}
                    >
                        <Image source={require("../../assets/livreur.png")} resizeMode="center" />

                    </Marker>
                }
            </MapView>


        </Container >
    );
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



export default TrackScreen;