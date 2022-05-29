import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base'
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';




const OrderScreen = () => {


    const isFocused = useIsFocused()


    useEffect(() => {
        setData([])
        checkStorage();

    }, [isFocused]);

    const checkStorage = async () => {
        try {
            let val = JSON.parse(await AsyncStorage.getItem("panier"))
            setData(val)
            if (val != null) {
                let somme = 0;
                val.forEach(item => {
                    somme += item.price * item.quantite
                    setSubTotal(somme)
                })

            }
        } catch (e) {
            alert('Failed to save the data to the storage')
        }

    }


    const [data, setData] = useState([]);
    const [compteur, setCompteur] = useState(1)
    const [disable, setDisable] = useState(false)
    const navigate = useNavigation();
    const frais = 10;
    const [subtotal, setSubTotal] = useState()

    const deleteItem = async (id) => {
        let newData = data.filter(item => {
            if (item.id === id) {
                setSubTotal(subtotal-(item.quantite*item.price))
                return
            }

        })

        await AsyncStorage.setItem('panier', JSON.stringify(newData))
            .then(() => setData(newData))

    }

    const ItemRender = ({ ligne }) => {
        return (
            <View style={styles.card}>
                <View style={styles.desc}>
                    <Text style={styles.smtitle}>{ligne.name}</Text>
                    <Text style={{ color: 'grey' }}>{ligne.restau}</Text>
                    <View style={styles.flexOperation}>
                        <Text style={styles.price}>{ligne.price} DHS</Text>
                        <View style={styles.operation}>

                            <Text>{ligne.quantite}</Text>
                        </View>

                    </View>
                </View>

                <Image style={styles.Img} source={{ uri: ligne.image }} />

                <TouchableOpacity onPress={() => deleteItem(ligne.id)} key={`${ligne.id}`}>
                    <Icon name='close' />
                </TouchableOpacity>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.label}>My order</Text>
                <FlatList
                    nestedScrollEnabled
                    style={styles.flatList}
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <ItemRender ligne={item} />
                    }
                />

            </ScrollView>
            <View style={styles.payment}>
                <Text style={styles.paymentSummary}>Payment summary</Text>
                <View style={styles.arange}>
                    <View style={styles.start}>
                        <Text style={styles.txt}>Subtotal</Text>
                        <Text style={styles.txt}>Delivery fee</Text>
                        <Text style={[styles.txt, { color: 'black' }]}>Total amount</Text>
                    </View>
                    <View style={styles.end}>
                        <Text style={styles.txt}>DHs {subtotal}</Text>
                        <Text style={styles.txt}>DHs {frais}</Text>
                        <Text style={[styles.txt, { color: 'black' }]}>DHs {subtotal + frais}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.buttons}>
                <Pressable style={styles.buttonAddItem}
                    onPress={() => navigate.navigate('HomeScreen')}
                >
                    <Text style={styles.textAddItem}>Add items</Text>
                </Pressable>
                <Pressable style={styles.buttonCheckout}
                    onPress={async () => await AsyncStorage.removeItem("panier")}
                >
                    <Text style={styles.textCheckout}>Checkout</Text>
                </Pressable>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'

    },
    smtitle: {
        color: 'black',
        fontSize: 15,
    },
    smsub: {
        color: 'gray'
    },
    price: {
        marginTop: 10,
        color: 'rgba(32,35,42,.6)',
        marginEnd: '-90%'
    },
    allFlatList: {
        width: 360,
    },
    card: {
        backgroundColor: 'white',
        marginBottom: 1,
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
    },
    desc: {
        marginStart: 20
      },
    label: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 20,
        color: 'black'
    },
    Img: {
        width: 80,
        height: 50,
        borderRadius: 10,
        marginStart: 130
    },
    operation: {
        alignItems: 'center',
        borderColor: '#e6dcdc',
        borderWidth: 1,
        borderRadius: 20,
        width: 80,
        paddingStart: 5,
        paddingEnd: 4,
        marginStart: 220,
        fontSize: 25
    },
    flexOperation: {
        flexDirection: 'row',
    },
    paymentSummary: {
        fontSize: 24,
    },
    end: {
        marginStart: 180
    },
    txt: {
        color: 'gray',
        fontSize: 15,
        marginBottom: 6,
        marginTop: 6
    },
    arange: {
        flexDirection: 'row'
    },
    buttons: {
        flexDirection: 'row',
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    buttonAddItem: {
        width: '44%',
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 2,
        borderWidth: 1,
        borderColor: '#f9ba07'
    },
    buttonCheckout: {
        color: 'red',
        backgroundColor: '#f9ba07',
        width: '44%',
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 2,
    },
    textAddItem: {
        color: '#f9ba07'
    },
    textCheckout: {
        color: 'white'
    }
})
export default OrderScreen;