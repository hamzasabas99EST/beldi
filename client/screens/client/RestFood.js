import React,{useState} from 'react'
import {StyleSheet,ScrollView,View,Text,SafeAreaView,Pressable,Modal,FlatList,Image} from 'react-native';
import {Icon} from 'native-base'
import { useRoute } from "@react-navigation/native";

const Data = [
    {
      id: 1,
      Key: 'Tacos De Lyon Gourmet1',
      subtitle:'Tacos . Burger',
      note:4.1,
      image:require('../../assets/repa1.png'),
    },
    {
      id: 2,
      Key: 'Tacos De Lyon Gourmet2',
      subtitle:'Tacos . Burger',
      note:4.1,
      image:require('../../assets/repa2.png'),
    },
    {
      id: 3,
      Key: 'Tacos De Lyon Gourmet3',
      subtitle:'Tacos . Burger',
      note:4.1,
      image:require('../../assets/repa3.png'),
    },
    {
      id: 4,
      Key: 'Tacos De Lyon Gourmet4',
      subtitle:'Tacos . Burger',
      note:4.1,
      image:require('../../assets/repa4.png'),
    },
  ];
  const Data1 = [
    {
      id: 1,
      Key: 'Twister Box',
      subtitle:'Pizza,frites, boisson 1',
      price:42,
      image:require('../../assets/all1.png'),
    },
    {
      id: 2,
      Key: 'Flag Box',
      subtitle:'Pizza,frites, boisson 2',
      price:46,
      image:require('../../assets/all2.png'),
    },
    {
      id: 3,
      Key: 'Red Hight',
      subtitle:'Pizza,frites, boisson 3',
      price:25,
      image:require('../../assets/all3.png'),
    },
    {
      id: 4,
      Key: 'Bland green',
      subtitle:'Pizza,frites, boisson 4',
      price:41,
      image:require('../../assets/all4.png'),
    },
    {
        id: 5,
        Key: 'Atlantic Tacos',
        subtitle:'Pizza,frites, boisson 5',
        price:31,
        image:require('../../assets/all5.png'),
      },
  ];
const RestFood=()=> {
  const [modalVisible, setModalVisible] = useState(false);
  const [compteur,setCompteur] = useState(1)
  const [price,setPrice] = useState()
  const [disable,setDisable] = useState(false)
  const route=useRoute(); 
  const [idBasic, setIdBasic] = useState()
  const [keyBasic, setKeyBasic] = React.useState()
  const [subtitleBasic, setSubtitleBasic] = React.useState()
  const [priceBasic, setPriceBasic] = React.useState()
  const showModalBasic = (id,key,sub,price) => {
    setIdBasic(id);
    setKeyBasic(key);
    setSubtitleBasic(sub);
    setPriceBasic(price)
  }
  return (
    <ScrollView 
        style={styles.container}>
        <SafeAreaView style={styles.header}>
            <Image style={styles.imgRest} source={route.params.image}/>
            <Text style={styles.preTime}>{route.params.minTime}-{route.params.maxTime} MIN</Text>
            <Text style={styles.title}>{route.params.Key}</Text>
            <View style={styles.not}>
                <Icon
                    name={"star"}
                    style={styles.icon}
                    onPress={() =>null}
                />
                <Text style={styles.textnote}>{route.params.note} . $</Text>
                <Text style={[styles.textnote,{marginStart:50}]}>.Commande minimum {route.params.commandeMin} DHS {"\n"}. Frais de livraison {route.params.fraisLivraison} DHS</Text>
            </View>
        </SafeAreaView>
        <View>
            <Text style={styles.label}>Last article</Text>
            <FlatList
                    style={styles.flatList}
                    horizontal={true}
                    data={Data}
                    renderItem={({item}) => 
                    <View style={styles.card}>
                        <Image style={styles.img} source={item.image}/>
                        <View style={styles.cardButtom}>
                            <Text style={styles.price}>44 DHS</Text>
                            <Text style={styles.smtitle}>{item.Key}</Text>
                            <Text style={styles.smsub}>{item.subtitle}</Text>
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
                    data={Data1}
                    renderItem={({item}) => 
                      <View>
                        <Modal
                          animationType="slide"
                          transparent={true}
                          visible={modalVisible}
                          onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                          }}
                        >
                          <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                              <Image style={styles.imgModal} source={require("../../assets/repa1.png")}/>
                              <Pressable
                                style={styles.iconModal}
                                onPress={() => {setModalVisible(!modalVisible)}}
                              >
                                <Icon
                                  name='close'
                                />
                              </Pressable>
                              <Text style={[styles.title,{fontWeight:'bold',alignSelf:'stretch',marginStart:0}]}>{keyBasic}</Text>
                              <Text style={{alignSelf:'stretch',marginTop:8,marginBottom:8}}>{subtitleBasic}</Text>
                              <Text style={{fontWeight:'bold',alignSelf:'stretch'}}>SR {priceBasic}</Text>
                              <View style={styles.operation}>
                                <Pressable disabled={disable} onPress={()=>{
                                  compteur>1?setCompteur(compteur-1):setDisable(true)
                                }}>
                                    <Icon
                                      name='remove-outline'
                                      style={{color:disable ? "#a9a9a9" : "#ff5a00"}}
                                    />
                                </Pressable>
                                <Text>{compteur}</Text>
                                <Pressable onPress={()=>{setCompteur(compteur+1);setDisable(false);}}>
                                    <Icon
                                      name='add-outline'
                                      style={{color:'#ff5a00'}}
                                    />
                                </Pressable>
                              </View>
                            </View>
                            {setPrice(Math.ceil(priceBasic*compteur))}
                            <View style={styles.buttModal}>
                                <Text>Add your order to benefit from a delicious food!</Text>
                                <Pressable style={styles.button}
                                    onPress={()=>alert("added")}  
                                  >
                                  <Text style={styles. whtext}>Add to basket</Text>
                                  <Text style={styles. whtext}>SR {price}</Text>
                                </Pressable>
                            </View>
                          </View>
                        </Modal>
                        <Pressable 
                          onPress={() => {setModalVisible(!modalVisible);showModalBasic(item.id,item.Key,item.subtitle,item.price)}}
                          style={styles.allCard}>
                            <Image style={styles.allImg} source={item.image}/>
                            <View style={styles.desc}>
                                <Text style={styles.smtitle}>{item.Key}</Text>
                                <Text style={{color:'grey'}}>{item.subtitle}</Text>
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
  container:{
    flex:1,
  },
  header:{
    width:'100%',
    backgroundColor:'white',
    paddingBottom:10
  },
  imgRest:{
    alignSelf:'center'
    },
    preTime:{
        backgroundColor:'white',
        color:'black',
        marginStart:'70%',
        padding:10,
        borderColor:'#e6dcdc',
        borderWidth:1,
        borderRadius:20,
        textAlign:'center',
        marginTop:-20,
        marginEnd:14
    },
    title:{
        color:'black',
        fontSize:20,
        marginTop:8,
        marginStart:10,
    },
    not:{
        flexDirection:'row',
        marginStart:10,
    },
    icon:{
        fontSize: 20,
        color:'gray',
    },
    textnote:{
        color:'gray', 
    },
    item:{
        backgroundColor:'#f9ba07',
        marginEnd:4,
        height:30,
        paddingStart:10,
        paddingEnd:10,
        paddingTop:4,
        paddingBottom:4,
        borderRadius:30,
        textAlign:'center',
        color:'black'
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
    img:{
        width:'100%',
        height:100,
        borderRadius:12
    },
    label:{
        marginStart:10,
        color:'gray',
        marginTop:15,
        marginBottom:15
    },
    smtitle:{
        color:'black',
        fontSize:15,
    },
    cardButtom:{
        width:'100%',
        paddingStart:10
    },
    smsub:{
        color:'gray'
    },
    price:{
        marginTop:10,
        color:'rgba(32,35,42,.6)',
    },
    flatList:{
        height:192,
        flexGrow: 0
    },
    allCard:{
        backgroundColor:'white',
        marginBottom:1,
        flexDirection:'row',
        height:100,
        alignItems:'center',
        paddingStart:10,
    },
    desc:{
        marginStart:10
    },
    allFlatList:{
        width:360
    },
    iconModal:{
       backgroundColor:'white',
       marginTop:'-64%',
       marginStart:'-104%',
       borderRadius:20,
       padding:6,
       marginBottom:160
    },
    modalView: {
      backgroundColor: "white",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 35,
      alignItems: "center",
      width:'100%',
      alignSelf:'center',
      marginTop:202,
      height:'48%'
    },
    imgModal:{
      marginTop:-35,
      borderRadius: 20,
      width:'124%'
    },
    operation:{
      flexDirection:'row',
      alignItems:'center',
      borderColor:'#e6dcdc',
      borderWidth:1,
      borderRadius:20,
      width:80,
      justifyContent:'space-between',
      paddingStart:4,
      paddingEnd:4,
      marginStart:220
    },
    buttModal:{
      backgroundColor:'white',
      height:176,
      paddingStart:10,
      alignItems:'center',
      justifyContent:'center',
      borderColor:'#e6dcdc',
      borderWidth:1,
    },
    button:{
      backgroundColor:'#ff5a00',
      width:'54%',
      height:38,
      marginTop:20,
      borderRadius:20,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingStart:10,
      paddingEnd:10
    },
    whtext:{
      color:'white'
    }
});
export default RestFood;