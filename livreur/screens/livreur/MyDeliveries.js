import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import axios from 'axios';
import ip from '../../helpers/ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'native-base';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import DetailModal from '../../component/DetailModal';


const MyDeliveries = () => {

    const [orders, setOrders] = useState()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let id = await AsyncStorage.getItem("idLivreur")
        axios.get(ip + `/delivries/${id}`)
            .then(res => setOrders(res.data))
            .catch(err => console.log(err.response))
    }

    const Commande = ({ commande }) => {
        const [open, setOpen] = useState(false)
        const [id, setId] = useState()

        const closed=()=>setOpen(false)


        return (
            <Pressable onPress={() => { setOpen(true); setId(commande._id) }}>
                <View style={styles.itemStyle}>
                    <View style={styles.itemLeft}>

                        <View style={{ marginTop: 5 }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Order : {commande._id}</Text>
                            <Text style={{ marginTop: 5, color: "#f9ba07" }}>
                                {new Date(commande.date_commande).toLocaleDateString()}
                                <Text style={{ paddingRight: 25, color: "black" }}> Heure  {new Date(commande.date_commande).getHours()}h : {new Date(commande.date_commande).getMinutes()}</Text>
                            </Text>
                        </View>

                    </View>
                    <View>

                        <Icon
                            name={!open ? 'arrow-forward' : 'arrow-down'}
                        />
                        <DetailModal isopen={open} id={id} isClose={closed}/>
                    </View>

                </View>
            </Pressable >

        )
    }

    return (
        <View style={styles.container}>
            <FlatList style={{ marginTop: 40, padding: 20 }}
                keyExtractor={item => item._id.toString()}
                data={orders}
                renderItem={({ item }) =>
                    <Commande commande={item} />
                }
            >

            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    itemStyle: {
        backgroundColor: '#fff',
        padding: 10,
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



})

export default MyDeliveries;