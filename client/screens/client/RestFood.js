import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, View, Text, SafeAreaView, Pressable, Modal, FlatList, Image, Dimensions } from 'react-native';
import { Icon } from 'native-base'
import { useRoute } from "@react-navigation/native";
import axios from 'axios';
import ip from '../../helpers/Ip';
import CustomModal from '../../component/CustomModal';

/*const Data = [
  {
    id: 1,
    Key: 'Tacos De Lyon Gourmet1',
    subtitle: 'Tacos . Burger',
    note: 4.1,
    image: require('../../assets/repa1.png'),
  },
  {
    id: 2,
    Key: 'Tacos De Lyon Gourmet2',
    subtitle: 'Tacos . Burger',
    note: 4.1,
    image: require('../../assets/repa2.png'),
  },
  {
    id: 3,
    Key: 'Tacos De Lyon Gourmet3',
    subtitle: 'Tacos . Burger',
    note: 4.1,
    image: require('../../assets/repa3.png'),
  },
  {
    id: 4,
    Key: 'Tacos De Lyon Gourmet4',
    subtitle: 'Tacos . Burger',
    note: 4.1,
    image: require('../../assets/repa4.png'),
  },
];
const Data1 = [
  {
    id: 1,
    Key: 'Twister Box',
    subtitle: 'Pizza,frites, boisson 1',
    price: 42,
    image: require('../../assets/all1.png'),
  },
  {
    id: 2,
    Key: 'Flag Box',
    subtitle: 'Pizza,frites, boisson 2',
    price: 46,
    image: require('../../assets/all2.png'),
  },
  {
    id: 3,
    Key: 'Red Hight',
    subtitle: 'Pizza,frites, boisson 3',
    price: 25,
    image: require('../../assets/all3.png'),
  },
  {
    id: 4,
    Key: 'Bland green',
    subtitle: 'Pizza,frites, boisson 4',
    price: 41,
    image: require('../../assets/all4.png'),
  },
  {
    id: 5,
    Key: 'Atlantic Tacos',
    subtitle: 'Pizza,frites, boisson 5',
    price: 31,
    image: require('../../assets/all5.png'),
  },
];*/
const RestFood = () => {


  useEffect(() => {
    getPlats()
    
  },[])

  const getPlats=async()=>{
   await axios.get(ip + `/restaurants/${route.params.id}`)
      .then( res => {
         setPlats(res.data)
         if(res.data[0].restaurant) setRestaurant(res.data[0].restaurant)
      })
      .catch(err => console.log(err))
  }

  const [plats, setPlats] = useState([])
  const [restaurant, setRestaurant] = useState()
 

  //Visiblite de modele
  const [modal, setModal] = useState(false);

  const route=useRoute(); 

  const closeModal=()=>{
      setModal(false)
  }

  const openModal=()=>{
    setModal(true)
  }
  

  return (

    <ScrollView
      style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Image style={styles.imgRest} source={{ uri:restaurant?.photo }} />
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
              {modal && <CustomModal isopen={modal}  plat={item} isclose={closeModal}/>}
              <Pressable
                onPress={openModal}
                style={styles.allCard}>
                <Image style={styles.allImg} source={{uri:item?.photo}} />
                <View style={styles.desc}>
                  <Text style={styles.smtitle}>{item.name}</Text>
                  <Text style={{ color: 'grey' }}>{item.extra}</Text>
                  <Text style={styles.price}>{item.price} DHS</Text>
                </View>
              </Pressable>
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
    width:'100%',
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

  card:{
    backgroundColor:'white',
    alignItems:'center',
    height:192,
    marginStart:7,
    marginEnd:7,
    width:166,
    borderRadius:12
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
    alignItems:"center" 
  },
  cardButtom: {
    width: Dimensions.get('window').width
    ,
    paddingStart: 10
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
    paddingStart: 30
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
    height: Dimensions.get('window').height/4

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

export default RestFood;