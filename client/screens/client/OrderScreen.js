import React,{useState} from 'react';
import { StyleSheet, View, Text,Image,FlatList,Pressable,ScrollView } from 'react-native';
import {Icon} from 'native-base'
import { useNavigation } from "@react-navigation/native";

const Data = [
    {
      id: 1,
      Key: 'Twister Box',
      subtitle:'Pizza,frites, boisson 1',
      price:42,
      quantite:2,
      image:require('../../assets/all1.png'),
    },
    {
      id: 2,
      Key: 'Flag Box',
      subtitle:'Pizza,frites, boisson 2',
      price:46,
      quantite:3,
      image:require('../../assets/all2.png'),
    },
    {
      id: 3,
      Key: 'Red Hight',
      subtitle:'Pizza,frites, boisson 3',
      price:25,
      quantite:1,
      image:require('../../assets/all3.png'),
    },
    {
      id: 4,
      Key: 'Bland green',
      subtitle:'Pizza,frites, boisson 4',
      price:41,
      quantite:2,
      image:require('../../assets/all4.png'),
    },
    {
        id: 5,
        Key: 'Atlantic Tacos',
        subtitle:'Pizza,frites, boisson 5',
        price:31,
        quantite:2,
        image:require('../../assets/all5.png'),
    },
    {
        id: 6,
        Key: 'Bland green',
        subtitle:'Pizza,frites, boisson 4',
        price:41,
        quantite:4,
        image:require('../../assets/all4.png'),
      },
      {
          id: 7,
          Key: 'Atlantic Tacos',
          subtitle:'Pizza,frites, boisson 5',
          price:31,
          quantite:2,
          image:require('../../assets/all5.png'),
        },
  ];
const OrderScreen=()=> {
    const [compteur,setCompteur] = useState(1)
    const [disable,setDisable] = useState(false)
    const navigate = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.label}>My order</Text>
                <FlatList
                        nestedScrollEnabled
                        style={styles.flatList}
                        data={Data}
                        renderItem={({item}) => 
                        <View style={styles.card}>
                            <View style={styles.desc}>
                                <Text style={styles.smtitle}>{item.Key}</Text>
                                <Text style={{color:'grey'}}>{item.subtitle}</Text>
                                <View style={styles.flexOperation}>
                                    <Text style={styles.price}>{item.price} DHS</Text>
                                    <View style={styles.operation}>
                                        <Pressable disabled={disable} onPress={()=>{
                                            if(compteur==2){
                                                setDisable(true)
                                                setCompteur(1)
                                            }
                                            else
                                                setCompteur(compteur-1)
                                        }}>
                                            <Icon
                                            name='remove-outline'
                                            style={{color:disable ? "#a9a9a9" : "#f9ba07"}}
                                            />
                                        </Pressable>
                                        <Text>{compteur}</Text>
                                        <Pressable onPress={()=>{setCompteur(compteur+1);setDisable(false);}}>
                                            <Icon
                                            name='add-outline'
                                            style={{color:'#f9ba07'}}
                                            />
                                        </Pressable>
                                </View>

                                </View>
                            </View>
                            <Image style={styles.Img} source={item.image}/>
                        </View>
                        }
                /> 
                <View style={styles.payment}>
                    <Text style={styles.paymentSummary}>Payment summary</Text>
                    <View style={styles.arange}>
                        <View style={styles.start}>
                            <Text style={styles.txt}>Subtotal</Text>
                            <Text style={styles.txt}>Delivery fee</Text>
                            <Text style={[styles.txt,{color:'black'}]}>Total amount</Text>
                        </View>
                        <View style={styles.end}>
                            <Text style={styles.txt}>SR 351.00</Text>
                            <Text style={styles.txt}>SR 15.00</Text>
                            <Text style={[styles.txt,{color:'black'}]}>SR 366.00</Text>
                        </View>
                    </View>     
                </View>
            </ScrollView>
            
            <View style={styles.buttons}>
                <Pressable style={styles.buttonAddItem}
                    onPress={()=>navigate.navigate('HomeScreen')} 
                    >
                    <Text style={styles.textAddItem}>Add items</Text>
                </Pressable>
                <Pressable style={styles.buttonCheckout}
                    onPress={()=>alert("checkout")}  
                    >
                    <Text style={styles.textCheckout}>Checkout</Text>
                </Pressable>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'white',
        alignItems:'center'

    },
    smtitle:{
        color:'black',
        fontSize:15,
    },
    smsub:{
        color:'gray'
    },
    price:{
        marginTop:10,
        color:'rgba(32,35,42,.6)',
        marginEnd:'-90%'
    },
    allFlatList:{
        width:360,
    },
    card:{
        backgroundColor:'white',
        marginBottom:1,
        flexDirection:'row',
        height:100,
        alignItems:'center',
    },
    label:{
        textAlign:'center',
        marginTop:40,
        fontSize:20,
        color:'black'
    },
    Img:{
        borderRadius:10,
        marginStart:130
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
      flexOperation:{
          flexDirection:'row',          
      },
      paymentSummary:{
          fontSize:24,
      },
      end:{
        marginStart:180
      },
      txt:{
          color:'gray',
          fontSize:15,
          marginBottom:6,
          marginTop:6
      },
     arange:{
         flexDirection:'row'
     },
     buttons:{
         flexDirection:'row',
         textAlign:'center',
         marginBottom:10,
         marginTop:10
     },
     buttonAddItem:{
        width:'44%',
        height:34,
        alignItems:'center',
        justifyContent:'center',
        marginEnd:2,
        borderWidth:1,
        borderColor:'#f9ba07'
     },
     buttonCheckout:{
        color: 'red',
        backgroundColor: '#f9ba07',
        width:'44%',
        alignItems:'center',
        justifyContent:'center',
        marginStart:2,
     },
     textAddItem:{
        color:'#f9ba07'
     },
     textCheckout:{
        color:'white'
     }
})
export default OrderScreen;