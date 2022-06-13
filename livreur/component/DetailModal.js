import React, { useState, useEffect } from 'react'

import { StyleSheet, View, Text, Modal, FlatList, Dimensions, Pressable } from 'react-native';
import axios from 'axios';
import ip from '../helpers/ip';
import { Icon } from 'native-base';




const DetailModal = (props) => {


    const { id } = props

    const [lignes, setLigne] = useState()

    useEffect(() => {
        if (id != undefined) {
            getData()

        }

    }, [id])

    const getData = async () => {

        await axios.get(ip + `/delivries/details/${id}`)
            .then(res => setLigne(res.data))
            .catch(err => console.log(err.response))

    }

    const close=()=>{
        props.isClose()
    }

    const Item = ({ data }) => {
        return (
            <View style={styles.itemStyle}>
                <View style={styles.itemLeft}>

                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontSize: 20 }}>{data.plat.name}</Text>
                        <Text style={{ marginTop: 5, color: "#f9ba07" }}>{data.restaurant.name}</Text>
                    </View>

                </View>
                <View>
                    <Text>QTE: {data.quantite}</Text>
                    <Text style={{ marginTop: 5, color: "#f9ba07", fontWeight: "bold" }}>{data.subTotal} MAD</Text>
                </View>


            </View>

        )
    }


    /*const close = () => {
        props.isclose()
    }*/

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.isopen}
                onRequestClose={close}
                style={styles.ContainerWrapper}
            >
                <View style={styles.modalView}>
                    <Pressable
                        style={styles.iconModal}
                        onPress={close}
                    >
                        <Icon
                            name='close'
                        />
                    </Pressable>
                    <FlatList style={{ marginTop: 15, padding: 1 }}
                        keyExtractor={item => item._id.toString()}
                        data={lignes}
                        renderItem={({ item }) =>
                            <Item data={item} />
                        }
                    ></FlatList>
                </View>


            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    ContainerWrapper: {
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: "gray",
    
    },
    itemStyle: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 20,
        width:350

    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    modalView: {
        backgroundColor: "rgb(55,58,71)",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 15,
        alignItems: "center",
        width: Dimensions.get('window').width,
        alignSelf: 'center',
        marginTop: 202,
        height: Dimensions.get('window').height
    },
    iconModal: {
        backgroundColor: 'white',
        marginStart: '-104%',
        borderRadius: 20,
        padding: 6,
        position:"absolute",
        marginStart:0,
        left:10,
        top:-25
        
    },



})



export default DetailModal