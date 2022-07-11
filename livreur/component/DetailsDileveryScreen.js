import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import axios from 'axios';
import ip from '../helpers/ip';

const DetailsDileveryScreen = ({ route }) => {

    const [details, setDetails] = useState()
    const [Total, setTotal] = useState(0)
    const [payed, setPayed] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [statusUpdate,setStatusUpdate]=useState("")

    let { name } = route.params
    let { id } = route.params
    let { status } = route.params




    useEffect(() => {
        getDetails()
       if(status!=null){
        setStatusUpdate(status)
       }

    }, [status])



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
                            return { ...item, isReady: res.data.ready }
                        return item
                    })
                    setDetails(feltred)
                    setStatusUpdate(res.data.status)
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
                        <Text style={{ fontSize: 16 }}>{ligne.plat.name}</Text>
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
                    if (res.status == 200) {
                        setIsLoading(false)
                        setPayed(true)
                        setStatusUpdate(res.data)
                        
                    }

                })
                .catch(err => console.log(err.response.data))

            setTimeout(() =>{ setPayed(false); }, 5000)
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
                        {statusUpdate=="payed" && <Text style={{fontSize:20,}}>delivered and paid</Text>}
                    </View>
                    <View style={styles.end}>
                        <Text style={styles.txt}>{Total} Mad</Text>
                        <Text style={styles.txt}>10 Mad</Text>
                        <Text style={[styles.txt, { color: 'black' }]}>{Total + 10} Mad</Text>
                    </View>
                </View>
                {(statusUpdate == "on the road"  ) &&
                    <TouchableOpacity style={styles.buttonVelid}
                        onPress={() => paying()}
                        disabled={loading}
                    >
                        {loading ?
                            <ActivityIndicator
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                }}
                                size='small'
                                color={"white"}
                            />
                            :
                            <Text style={styles.textValid}>
                                Payed
                            </Text>
                        }
                    </TouchableOpacity>}
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
        padding:15,
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
        padding: 5,
        borderRadius: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 20,
        

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
        marginRight: 10,
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
        marginBottom: 50,
        marginTop: 30,
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
        height: 35,
        paddingTop: 8,
        paddingBottom: 8,
        marginTop: 80,
        borderRadius: 20,
        alignSelf: 'flex-end'
    },
    textValid: {
        color: 'white'
    },

})

export default DetailsDileveryScreen;