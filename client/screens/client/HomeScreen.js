import  React,{useState,useEffect} from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen=()=> {

    useEffect( () => {
        getData()
    
    });
    
    const getData = async () => {
        let val = await AsyncStorage.getItem("idClient")
        if (val != null) {
            isId(val)
        }
      }

    const [id,isId]=useState()

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('This is the "Home" screen.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>{id}</Text>
        </View>
    );
}

export default HomeScreen;