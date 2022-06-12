import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable,Dimensions } from 'react-native';
import { CheckBox } from 'react-native-elements'

import axios from 'axios';
import ip from '../helpers/ip';

const DetailsDileveryScreen = ({ route }) => {

    useEffect(() => {
        getDetails()
        //console.log(route.params?.id)
    }, [])

    const [details, setDetails] = useState()
    let { name } = route.params

    const getDetails = () => {
        let { id } = route.params
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
                <View>
                    <Text>QTE: {ligne.quantite}</Text>
                    <Text style={{ marginTop: 5, color: "#f9ba07", fontWeight: "bold" }}>{ligne.subTotal} MAD</Text>
                </View>
            </View>


        )
    }


    return (
        <View style={styles.ContainerWrapper}>
            <Text style={styles.sectionTitle}>{name}</Text>
            <FlatList
                keyExtractor={item => item._id.toString()}
                data={details}
                renderItem={({ item }) =>
                    <Item ligne={item} />
                }
            />
            <View style={styles.payment}>
                <Text style={styles.paymentSummary}>Payment summary</Text>
                <View style={styles.arange}>
                    <View style={styles.start}>
                        <Text style={styles.txt}>Subtotal</Text>
                        <Text style={styles.txt}>Delivery fee</Text>
                        <Text style={[styles.txt, { color: 'black' }]}>Total amount</Text>
                    </View>
                    <View style={styles.end}>
                        <Text style={styles.txt}>15 DHs</Text>
                        <Text style={styles.txt}>10 DHs</Text>
                        <Text style={[styles.txt, { color: 'black' }]}>55 DHs</Text>
                    </View>
                </View>
                <Pressable style={styles.buttonVelid}
                    onPress={() => alert("salamoAlaikom")}
                >
                    <Text style={styles.textValid}>Payed</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    ContainerWrapper: {
        marginTop: 40,
        padding: 20,
        paddingHorizontal: 20
    },
    sectionTitle: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom:20
    },
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
    paymentSummary: {
        fontSize: 18,
    },
    arange: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    txt: {
        color: 'gray',
        fontSize: 14,
        marginBottom: 6,
        marginTop: 6
    },
    payment:{
        padding:15,
        width:Dimensions.get('window').width-20,
        alignSelf:'center',
        marginBottom:20,
        marginTop:50,
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    buttonVelid:{
        backgroundColor:'#f9ba07',
        alignItems:'center',
        width:140,
        paddingTop:8,
        paddingBottom:8,
        marginTop:4,
        borderRadius:20,
        alignSelf:'flex-end'
    },
    textValid:{
        color:'white'
    },

})

export default DetailsDileveryScreen;