import React from "react"
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'

const AboutUs = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Markers </Text>
            <View>
                <View style={styles.item}>
                    <Image source={require("../../assets/taken.png")} />
                    <Text style={styles.text}>The order was taken</Text>
                </View>

                <View style={styles.item}>
                    <Image source={require("../../assets/processing.png")} />
                    <Text style={styles.text}>The order under processing</Text>
                </View>

                <View style={styles.item}>
                    <Image source={require("../../assets/road.png")} />
                    <Text style={styles.text}>The order on the road</Text>
                </View>
                <View style={styles.item}>
                    <Image source={require("../../assets/delivered.png")} />
                    <Text style={styles.text}>The order was delivered</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop:50,
   
    },
    item: {
        padding: 20,
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",
        width:Dimensions.get("screen").width,
        
    },
    title:{
        fontSize:30,
        fontWeight:"bold",

    },
    text:{
      fontSize:20
    }
})

export default AboutUs