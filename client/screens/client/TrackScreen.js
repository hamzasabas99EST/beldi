import { React, useRef, useEffect, useState } from 'react';
import { Container, View } from 'native-base';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';




const TrackScreen = () => {

    
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
         setCoordinatesClient({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        })
        refMap.current.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        })
        
    }
    
/*
const onMapReady = () => {
        getUserLocation()
    }

    */
    
    const refMap = useRef(null)

    const [coordinatesClient,setCoordinatesClient] = useState();
    const [coordinatesLivreur,setCoordinatesLivreur] = useState();


    return (
        
        <Container>
            <MapView
                style={{ flex: 1 }}
               
                ref={refMap}
                /* 
             onMapReady={()=>onMapReady()}*/

            >

               
                {coordinatesClient && <Marker coordinate={coordinatesClient} />}
                
                {/*<Marker coordinate={coordinates[1]} />*/}
            </MapView>
        </Container >
    );
}

const GOOGLE_API_KEY = 'AIzaSyAcJ1ipyzXYdNTUTGCkycsXy4QvegbXgjU'

export default TrackScreen;