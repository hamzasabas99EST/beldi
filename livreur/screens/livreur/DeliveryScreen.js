import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { Icon } from 'native-base'
import axios from 'axios';
import ip from '../../helpers/ip';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeliveryScreen = () => {

    useEffect(() => {
        getRestaurants()
    }, [])

    const [restaurants, setRestaurants] = useState([])

    const getRestaurants =async () => {
        let id=await AsyncStorage.getItem("idLivreur")
        axios.get(ip + `/restaurants/${id}`)
            .then(res => setRestaurants(res.data))
            .catch(err => console.log(err))
    }

    return (
        <View style={styles.base}>
            <FlatList
                style={styles.restFlatList}
                data={restaurants}
                keyExtractor={item => item._id}
                renderItem={({ item }) =>
                    <View
                        style={styles.card}>
                        <Image style={styles.imgRest} source={{ uri: item.photo }} />
                        <View style={styles.cardButtom}>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={styles.sub}>{item.adresse}</Text>
                            <View style={styles.not}>
                                <Icon
                                    name={"call-outline"}
                                    style={styles.star}
                                />
                                <Text style={styles.textnote}>{item.tele}</Text>
                            </View>
                        </View>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        alignItems: 'center',
    },
    restFlatList: {
        width: '90%',
        height: 100,
        marginTop: 50
    },
    card: {
        backgroundColor: 'white',
        paddingBottom: 20,
        borderColor: '#e6dcdc',
        borderWidth: 1.5,
        borderRadius: 8,
        marginBottom: 6
    },
    imgRest: {
        height: 180,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8
    },
    title: {
        color: 'black',
        fontSize: 20,
        marginTop: 15
    },
    sub: {
        color: 'gray'
    },
    not: {
        flexDirection: 'row',
        color: 'gray',
        alignItems: 'center'
    },
    cardButtom: {
        marginStart: 10
    },
    star: {
        fontSize: 20,
        marginEnd: 10,
        color: "#f9ba07"
    },
    textnote: {
        alignSelf: 'center'
    }



})

export default DeliveryScreen;