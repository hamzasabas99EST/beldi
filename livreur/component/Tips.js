import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Icon } from 'react-native-elements';


const Tips = (props) => {


    const slides = [

        {
            key: 'one',
            title: 'Thank you for joining us',
            text: ' ',
            image: require('../assets/tajine_.png'),
            backgroundColor: '#000',
        },
        {
            key: 'two',
            title: 'As a Delivery',
            text: 'You must always be ready to move from a restaurant to the others',
            image: require('../assets/2.png'),
            backgroundColor: '#000',
        },
        {
            key: 'three',
            title: 'Satisfied customers',
            text: 'With our services the customer will be able to pay after you delivered the food',
            image: require('../assets/3.png'),
            backgroundColor: '#000',
        },

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


    const nextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name="arrow-forward-outline"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    type='ionicon'

                />
            </View>
        );
    }

    const onDone = async () => {
        await AsyncStorage.setItem("Visited", "Yess")
            .then(() =>
                props.closed()
            )
    }

    const renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name="checkmark-outline"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    type='ionicon'

                />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor="transparent" />
            <AppIntroSlider
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                data={slides}
                onDone={onDone}
                renderDoneButton={renderDoneButton}
                renderNextButton={nextButton}
                activeDotStyle={{backgroundColor:"#f9ba07"}}
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
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height - 300,
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
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default Tips;