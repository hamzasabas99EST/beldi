import { React, useRef, useEffect, useState } from 'react';
import { Container, View } from 'native-base';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';




const TrackScreen = () => {

    /*const [currentLocation, setCurrentLocation] = useState()

    useEffect(() => {
        getUserLocation()
    }, [])

    const getUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        await setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        })
        refMap.current.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        })

    }

const onMapReady = () => {
        getUserLocation()
    }

    const refMap = useRef(null)*/


    const [coordinates] = useState([
        {
            latitude: 48.8587741,
            longitude: 2.2069771,
        },
        {
            latitude: 48.8323785,
            longitude: 2.3361663,
        },
    ]);

    return (
        
        <Container>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 48.864716,
                    longitude: 2.349014,
                    latitudeDelta: 0.0622,
                    longitudeDelta: 0.0121,
                }}
            /* 
             ref={refMap}
             onMapReady={()=>onMapReady()}*/

            >

                <Polyline
                    coordinates={coordinates}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={['#7F0000']}
                    strokeWidth={6}
                />
                <MapViewDirections
                    origin={coordinates[0]}
                    destination={coordinates[1]}
                    apikey={GOOGLE_API_KEY} // insert your API Key here
                    strokeWidth={1}
                    strokeColor="#111111"
                />
                <Marker coordinate={coordinates[0]} />
                <Marker coordinate={coordinates[1]} />
            </MapView>
        </Container >
    );
}

const GOOGLE_API_KEY = 'AIzaSyAcJ1ipyzXYdNTUTGCkycsXy4QvegbXgjU'

export default TrackScreen;