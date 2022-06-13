import React, { useState, useEffect, useRef } from 'react';
import { Icon } from 'native-base'
import {
  Text,
  Image,
  TextInput,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator

} from 'react-native';
import axios from 'axios';
import ip from '../../helpers/Ip'
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Location from 'expo-location';



const HomeScreen = (props) => {


  const { navigation } = props

  useEffect(() => {

    navigation.addListener('focus', async () =>  geRestaurants()   )

  }, [])

  const [search,setSearch]=useState(null)
  const [restaurants, setRestaurants] = useState()

  
  const [categories, setCategories] = useState()

  const [isloaded, setIsLoaded] = useState(true)

  
  const geRestaurants = async () => {
    const city = await getCity()

    if(city)   setIsLoaded(false)

    await axios.get(ip + `/restaurants/${city}`)
      .then(res => setRestaurants(res.data))
      .catch(err => console.log(err.response))

    await axios.get(ip + "/restaurants/get/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err.response.message))

   

   


  }

 


  const onPressHandler = (id) => {
    let renderData = [...restaurants];
    for (let data of restaurants) {
      if (data._id == id) {
        data.selected = (data.selected == null) ? true : !data.selected;
        break;
      }
    }
    setRestaurants(renderData);
  }

  const searchHandler = (name) => {
    if (name != "") {
      let filtred = restaurants.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
      setSearch(filtred)
    }
    else setSearch(restaurants)
  }

  const data=search ? search: restaurants

  return (
    <View style={styles.container}>
      {isloaded ?
        <ActivityIndicator
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          size='large'
          color={"black"}
        />

        : <>
          <View style={styles.search}>
            <Image style={styles.icon} source={require('../../assets/search.png')} />
            <TextInput placeholder="Search ..." onChangeText={text => searchHandler(text)} />
          </View>
          <FlatList
            style={styles.flatList}
            horizontal={true}
            data={categories}
            keyExtractor={item => item._id}
            renderItem={({ item }) =>
              <Text style={styles.item} onPress={() => AsyncStorage.clear()}>{item.name}</Text>
            }
          />
          <FlatList
            style={styles.restFlatList}
            data={data}
            keyExtractor={item => item._id}
            renderItem={({ item }) =>
              <TouchableOpacity
                onPress={() => navigation.navigate('RestFood', { id: item._id })}
                style={styles.card}
              >
                <Image style={styles.imgRest} source={{ uri: item.photo }} />
                <View style={styles.cardButtom}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.sub}>{item.subtitle}</Text>
                  <View style={styles.not}>
                    <Icon
                      name={"star"}
                      style={[styles.star, { color: item.selected == true ? "#f9ba07" : "#a9a9a9" }]}
                      onPress={() => onPressHandler(item._id)}
                    />
                    <Text style={styles.textnote}>{item.note} . $</Text>
                  </View>
                </View>
              </TouchableOpacity>
            }
          />
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  search: {
    flexDirection: 'row',
    backgroundColor: '#e8e4e4',
    width: '80%',
    height: 40,
    alignItems: 'center',
    borderRadius: 20
  },
  icon: {
    width: 20,
    height: 20,
    marginStart: 10,
    marginEnd: 10,
  },
  flatList: {
    width: '90%',
    marginTop: 10,
  },
  item: {
    backgroundColor: '#f9ba07',
    marginEnd: 4,
    height: 30,
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 30,
    textAlign: 'center',
    color: 'black'
  },
  restFlatList: {
    width: '90%',
    height: 100,
    marginTop: -420,
  },
  card: {
    backgroundColor: 'white',
    paddingBottom: 20,
    borderColor: '#e6dcdc',
    borderWidth: 1.5,
    borderRadius: 8,
    marginBottom: 6
  },
  imgRest: {
    height: 180,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8
  },
  title: {
    color: 'black',
    fontSize: 20,
    marginTop: 15
  },
  sub: {
    color: 'gray'
  },
  not: {
    flexDirection: 'row',
    color: 'gray',
  },
  cardButtom: {
    marginStart: 10
  },
  star: {
    fontSize: 20,
    marginEnd: 10
  },
  textnote: {
    alignSelf: 'center'
  }
});

export default HomeScreen;

