import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { CheckBox } from 'react-native-elements'

import axios from 'axios';
import ip from '../../helpers/ip';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeliveryScreen = () => {

    useEffect(() => {
        getDetails()
    }, [])

    const [details, setDetails] = useState()

    const getDetails = () => {
        let id = "62a1102bf3545b78a21eb160"
        axios(ip + `/getDetailsCommande/${id}`)
            .then(res => setDetails(res.data.ligne))
            .catch(err => console.log(err))

    }

    const isReady = (checked, id) => {
        if (!checked) {


            axios.post(ip + `/updateLigne/${id}`)
                .then(res => {
                    let feltred = details.map(item => {
                        if (item._id === id)
                            return { ...item, isReady: res.data }
                        return item
                    })

                    setDetails(feltred)
                })
                .catch(err => console.log(err.response))
        }

    }

    const Item = ({ ligne }) => {
        return (
            <View style={styles.itemStyle}>
                <View style={styles.itemLeft}>

                    <CheckBox
                        style={styles.Checkbox}
                        uncheckedColor={"#f9ba07"}
                        checkedColor={"#000"}
                        checked={ligne.isReady}
                        onPress={() => isReady(ligne.isReady, ligne._id)}
                    />

                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontSize: 20 }}>{ligne.plat.name}</Text>
                        <Text style={{ marginTop: 5, color: "#f9ba07" }}>{ligne.restaurant.name}</Text>
                    </View>

                </View>
                <Pressable onPress={async () => await AsyncStorage.clear()}>
                    <View>
                        <Text>QTE: {ligne.quantite}</Text>
                        <Text style={{ marginTop: 5, color: "#f9ba07", fontWeight: "bold" }}>{ligne.subTotal} MAD</Text>
                    </View>

                </Pressable>
            </View>

        )
    }

    return (
        <View>
            <Text>Hamza</Text>
            <FlatList style={{ marginTop: 40, padding: 20 }}
                keyExtractor={item => item._id.toString()}
                data={details}
                renderItem={({ item }) =>
                    <Item ligne={item} />
                }
            >

            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    itemStyle: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 20

    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    Checkbox: {
        width: 22,
        height: 22,
        backgroundColor: "#000",
        marginRight: 15,
        alignItems: "center",
        padding: 2

    },




})

export default DeliveryScreen;