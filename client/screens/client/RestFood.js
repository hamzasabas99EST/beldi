import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, View, Text, SafeAreaView, Pressable, Modal, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base'
import { useRoute } from "@react-navigation/native";
import axios from 'axios';
import ip from '../../helpers/Ip';
import CustomModal from '../../component/CustomModal';


const RestFood = () => {


  useEffect(() => {
    getPlats()

  }, [])

  const getPlats = async () => {
    await axios.get(ip + `/restaurants/plats/${route.params.id}`)
      .then(res => {
        setPlats(res.data)
        if (res.data[0].restaurant) setRestaurant(res.data[0].restaurant)
      })
      .catch(err => console.log(err))
  }

  const [plats, setPlats] = useState([])
  const [platModal, setplatModal] = useState([])
  const [restaurant, setRestaurant] = useState()


  //Visiblite de modele
  const [modal, setModal] = useState(false);

  const route = useRoute();

  const closeModal = () => {
    setModal(false)
  }

  const openModal = (item) => {
    setplatModal(item)
    setModal(true)
  }


  return (

    <ScrollView
      style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Image style={styles.imgRest} source={{ uri: restaurant?.photo }} />
        <Text style={styles.preTime}>30 MIN</Text>
        <Text style={styles.title}>{restaurant?.name}</Text>
        <View style={styles.not}>
          <Icon
            name={"star"}
            style={styles.icon}
            onPress={() => null}
          />
          <Text style={styles.textnote}> 4. $</Text>
          <Text style={[styles.textnote, { marginStart: 50 }]}>Commande minimum 40 DHS {"\n"} Frais de livraison 10 DHS</Text>
        </View>
      </SafeAreaView>
      <View>
        <Text style={styles.label}>Last article</Text>
        <FlatList
          style={styles.flatList}
          horizontal={true}
          data={plats}
          keyExtractor={item => item._id.toString()}
          renderItem={({ item }) =>
            <View style={styles.card}>
              <Image style={styles.img} source={{ uri: item.photo }} />
              <View style={styles.cardButtom}>
                <Text style={styles.price}>{item.price} DHS</Text>
                <Text style={styles.smtitle}>{item.name}</Text>
                <Text style={styles.smsub}>  {item.extra}</Text>
              </View>
            </View>
          }
        />
      </View>
      <Text style={styles.label}>All</Text>
      <ScrollView horizontal={true}>
        <FlatList
          nestedScrollEnabled
          style={styles.allFlatList}
          data={plats}
          keyExtractor={item => item._id.toString()}
          renderItem={({ item }) =>
            <View>
              <CustomModal isopen={modal} plat={platModal} isclose={closeModal} />
              <TouchableOpacity
                onPress={() => { setplatModal(item); setModal(true); }}
                style={styles.allCard}>
                <Image style={styles.allImg} source={{ uri: item?.photo }} />
                <View style={styles.desc}>
                  <Text style={styles.smtitle}>{item.name}</Text>
                  <Text style={{ color: 'grey' }}>{item.extra}</Text>
                  <Text style={styles.price}>{item.price} DHS</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
        />
      </ScrollView>

    </ScrollView>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    backgroundColor: 'white',
    paddingBottom: 10
  },
  imgRest: {
    height: 180,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8
  },
  preTime: {
    backgroundColor: 'white',
    color: 'black',
    marginStart: '70%',
    padding: 10,
    borderColor: '#e6dcdc',
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center',
    marginTop: -20,
    marginEnd: 14
  },
  title: {
    color: 'black',
    fontSize: 20,
    marginTop: 8,
    marginStart: 10,
  },
  not: {
    flexDirection: 'row',
    marginStart: 10,
  },
  icon: {
    fontSize: 20,
    color: 'gray',
  },
  textnote: {
    color: 'gray',
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

  card: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: 192,
    marginStart: 7,
    marginEnd: 7,
    width: 166,
    borderRadius: 12
  },
  img: {
    width: '100%',
    height: 100,
    borderRadius: 12
  },
  label: {
    marginStart: 15,
    color: 'gray',
    marginTop: 15,
    marginBottom: 15
  },
  smtitle: {
    color: 'black',
    fontSize: 15,
    alignItems: "center"
    
  },
  smsub: {
    color: 'gray'
  },
  price: {
    marginTop: 10,
    color: 'rgba(32,35,42,.6)',
  },
  flatList: {
    height: 192,
    flexGrow: 0
  },
  allCard: {
    backgroundColor: 'white',
    marginBottom: 1,
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    paddingStart: 30,
    marginBottom: 10
  },
  desc: {
    marginStart: 20
  },
  allFlatList: {
    width: Dimensions.get('window').width
  },
  allImg: {
    width: '25%',
    height: 100,

  },

  whtext: {
    color: 'white'
  }
});

export default RestFood;