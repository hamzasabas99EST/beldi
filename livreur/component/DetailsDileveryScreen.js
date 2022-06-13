import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import axios from 'axios';
import ip from '../helpers/ip';

const DetailsDileveryScreen = ({ route }) => {

    const [details, setDetails] = useState()
    const [Total, setTotal] = useState(0)
    const [payed, setPayed] = useState(false)
    const [loading, setIsLoading] = useState(false)
    let { name } = route.params
    let { id } = route.params




    useEffect(() => {
        getDetails()
        //console.log(route.params?.id)
    }, [])



    const getDetails = () => {
        axios(ip + `/getDetailsCommande/${id}`)
            .then(res => {
                setDetails(res.data.ligne)
                setTotal(res.data.Total)
            })
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

    const paying = () => {
        setIsLoading(true)
        setTimeout(() => {
            axios.post(ip + `/payed/${id}`)
                .then(res => {
                    if (res.status == 20)
                    setIsLoading(false)    
                    setPayed(true)

                })
                .catch(err => console.log(err.response.data))

            setTimeout(() => setPayed(false), 2000)
        }, 3000)
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
            {details && <View style={styles.payment}>
                <Text style={styles.paymentSummary}>Payment summary</Text>
                <View style={styles.arange}>
                    <View style={styles.start}>
                        <Text style={styles.txt}>Subtotal</Text>
                        <Text style={styles.txt}>Delivery fee</Text>
                        <Text style={[styles.txt, { color: 'black' }]}>Total amount</Text>
                    </View>
                    <View style={styles.end}>
                        <Text style={styles.txt}>{Total} DHs</Text>
                        <Text style={styles.txt}>10 DHs</Text>
                        <Text style={[styles.txt, { color: 'black' }]}>{Total + 10} DHs</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonVelid}
                    onPress={() => paying()}
                    disabled={isLoading}
                >
                    {loading ?
                        <ActivityIndicator
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            size='large'
                            color={"white"}
                        />
                        :
                        <Text style={styles.textValid}>Payed</Text>
                    }
                </TouchableOpacity>
            </View>}

            <FancyAlert
                visible={payed}
                icon={<View style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#28a745',
                    borderRadius: 50,
                    width: '100%',
                }}><Text style={{ color: "white" }}>✔</Text></View>}
                style={{ backgroundColor: 'white' }}
            >
                <Text style={{ marginTop: -16, marginBottom: 32 }}>the order has been payed</Text>
            </FancyAlert>
        </View>
    );
}

const styles = StyleSheet.create({
    ContainerWrapper: {
        marginTop: 40,
        padding: 20,
        paddingHorizontal: 20,
        flex: 2
    },
    sectionTitle: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20
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
        justifyContent: 'space-between'
    },
    txt: {
        color: 'gray',
        fontSize: 14,
        marginBottom: 6,
        marginTop: 6
    },
    payment: {
        flex: 1,
        padding: 15,
        width: Dimensions.get('window').width - 20,
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 50,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    buttonVelid: {
        backgroundColor: '#f9ba07',
        alignItems: 'center',
        width: 140,
        paddingTop: 8,
        paddingBottom: 8,
        marginTop: 50,
        borderRadius: 20,
        alignSelf: 'flex-end'
    },
    textValid: {
        color: 'white'
    },

})

export default DetailsDileveryScreen;