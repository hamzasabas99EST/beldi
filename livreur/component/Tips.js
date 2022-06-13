import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';


const Tips = (props) => {


    const slides = [
        {
            key: 'one',
            title: '',
            text: 'Thank you for joining us ',
            image: require('../assets/tajine_.png'),
            backgroundColor: '#000',
        },
        {
            key: 'two',
            title: 'As our Delivery',
            text: 'You should be able to ',
            image: require('../assets/2.png'),
            backgroundColor: '#000',
        },
        {
            key: 'three',
            title: 'Satisfied customers',
            text: 'With our services',
            image: require('../assets/3.png'),
            backgroundColor: '#000',
        },
        {
            key: 'four',
            title: 'Rocket guy',
            text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
            image: require('../assets/livreur.png'),
            backgroundColor: '#000',
        }
    ];

    const renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    }



    const onDone = () => alert("done")

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor="transparent" />
            <AppIntroSlider
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                data={slides}
            />
        </View>

    );

}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white"

    },
    image: {
        width:Dimensions.get("screen").width,
        height:Dimensions.get("screen").height-300,
        marginVertical: 32,
    },
    text: {

        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        marginHorizontal: 60
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        color: 'black',
        textAlign: 'center',
        marginHorizontal: 60
    },
});

export default Tips;