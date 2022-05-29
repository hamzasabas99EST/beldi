import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, ScrollView, View, Text, SafeAreaView, Pressable, Modal, FlatList, Image, Dimensions } from 'react-native';
import { Spinner, Icon } from 'native-base'
import { useIsFocused, useNavigation } from '@react-navigation/native';



const CustomModal = (props) => {



    const { plat } = props

    const navigation = useNavigation()

    //Compteur des plats
    const [compteur, setCompteur] = useState(1)

    //Price totale
    const [price, setPrice] = useState(1)

    const [disable, setDisable] = useState(false)

    const [isloaded, setLoaded] = useState(false)

    const remove = () => {

        if (compteur == 1) {
            setDisable(true)
        } else {
            setCompteur(compteur - 1)
        }

    }

    const add = () => {

        setCompteur(compteur + 1); setDisable(false);

    }

    const close = () => {
        props.isclose()
    }

    const add_to_basket = async () => {

        setLoaded(true)

        let panier = JSON.parse(await AsyncStorage.getItem("panier")) || []
        let checkProduit = false
        let ligne_commande={"id":plat._id,"name":plat.name,"quantite":compteur,"restau":plat.restaurant.name,"price":plat.price,"image":plat.photo}

        setTimeout(async () => {
            if (panier.length === 0)
                panier.push(ligne_commande)
            else {
               checkProduit= panier.find(item => {
                    if (item.id === ligne_commande.id) {
                        item.quantite += ligne_commande.quantite
                        return true;
                    }
                    
                })
                if(!checkProduit) panier.push(ligne_commande)
            }

            await AsyncStorage.setItem('panier', JSON.stringify(panier))
                .then(() => setLoaded(false))
        }, 1000)
        
       


    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.isopen}
                onRequestClose={close}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Image style={styles.imgModal} source={{ uri: plat.photo }} />
                        <Pressable
                            style={styles.iconModal}
                            onPress={close}
                        >
                            <Icon
                                name='close'
                            />
                        </Pressable>
                        <Text style={[styles.title, { fontWeight: 'bold', alignSelf: 'stretch', marginStart: 0 }]}>{plat.name}</Text>
                        <Text style={{ alignSelf: 'stretch', marginTop: 8, marginBottom: 8 }}>{plat.extra}</Text>
                        <Text style={{ fontWeight: 'bold', alignSelf: 'stretch' }}>Dhs {plat.price}</Text>
                        <View style={styles.operation}>
                            <Pressable disabled={disable} onPress={remove}>
                                <Icon
                                    name='remove-outline'
                                    style={{ color: compteur == 1 ? "#a9a9a9" : "#ff5a00" }}
                                />
                            </Pressable>
                            <Text>{compteur}</Text>
                            <Pressable onPress={add}>
                                <Icon
                                    name='add-outline'
                                    style={{ color: '#ff5a00' }}
                                />
                            </Pressable>
                        </View>

                    </View>

                    <View style={styles.buttModal}>
                        <Text>Add your order to benefit from a delicious food!</Text>
                        <Pressable style={styles.button}
                            onPress={add_to_basket}
                        >
                            {!isloaded ?
                                <>
                                    <Text style={styles.whtext}>Add to basket</Text>
                                    <Text style={styles.whtext}>{Math.ceil(plat.price * compteur)} Dhs </Text>
                                </> :
                                <Spinner style={{ alignItems: "center" }} color={"#00000"} />
                            }

                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({

    price: {
        marginTop: 10,
        color: 'rgba(32,35,42,.6)',
    },

    iconModal: {
        backgroundColor: 'white',
        marginTop: '-64%',
        marginStart: '-104%',
        borderRadius: 20,
        padding: 6,
        marginBottom: 160
    },
    modalView: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 35,
        alignItems: "center",
        width: Dimensions.get('window').width,
        alignSelf: 'center',
        marginTop: 202,
        height: Dimensions.get('window').height / 2
    },
    imgModal: {
        marginTop: -35,
        marginBottom: 25,
        borderRadius: 20,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 4

    },
    operation: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#e6dcdc',
        borderWidth: 1,
        borderRadius: 20,
        width: 80,
        justifyContent: 'space-between',
        paddingStart: 4,
        paddingEnd: 4,
        marginStart: 220
    },
    buttModal: {
        backgroundColor: 'white',
        height: 176,
        paddingStart: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#e6dcdc',
        borderWidth: 1,
    },
    button: {
        backgroundColor: '#ff5a00',
        width: '54%',
        height: 38,
        marginTop: 20,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingStart: 10,
        paddingEnd: 10
    },
    whtext: {
        color: 'white'
    }
});

export default CustomModal