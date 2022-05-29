import * as React from 'react';
import { StyleSheet, View, Text,Image, Dimensions,Pressable } from 'react-native';
import {Icon} from 'native-base'
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const ProfileScreen=()=> {
    return (
        <View style={styles.container}>
            <View style={styles.gold}>
                <Image style={styles.Img} source={require('../../assets/uprofil.png')}/>
                <Pressable 
                    style={styles.iconPress}
                    onPress={() => {alert("Edit Photo")}}
                    >
                    <Icon
                        name='camera'
                        style={styles.icon}
                    />
                    </Pressable>
                    <Text style={styles.bold}>Mohamed Taoufiki</Text>
                    <Text style={styles.email}>sim.taoufiki@gmail.com</Text>
                    <Pressable
                        style={styles.btnPress}
                        onPress={() => {alert("Edit Profil")}}
                    >
                    <Text>Edit Profil</Text>
            </Pressable>
            </View>
             <View style={styles.card}>
                <Icon
                    name='cart'
                    style={styles.iconBag}
                />
                <Text style={styles.cmdText}>Total Command 10</Text>
             </View>
             <View style={[styles.card,{marginTop:10}]}>
                <Icon
                    name='list'
                    style={styles.iconBag}
                />
                <Text style={[styles.cmdText,{color:'black'}]}>Total Order 22</Text>
             </View>
             
            <Pressable
                style={styles.btnPressed}
                onPress={() => {alert("Log out")}}
                >
                <Icon
                    name='log-out'
                    style={styles.icon}
                />
                <Text style={{color:'black'}}>Logout</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        backgroundColor:'white',
    },
    Img:{
        width:100,
        height:100,
        borderRadius:100,
        marginTop:40
    },
    iconPress:{
        backgroundColor:'#f8f2f2',
        width:34,
        height:34,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        top:-28,
        left:28,
        borderWidth:2,
        borderColor:'white'
    },
    bold:{
        fontWeight:'bold',
        fontSize:20,
        top:-20
    },
    email:{
        top:-20 
    },
    btnPress:{
        borderWidth:1,
        borderColor:'gray',
        borderRadius:20,
        width:90,
        padding:4,
        alignItems:'center'
    },
    card:{
        flexDirection:'row',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        marginTop:100,
        width:Dimensions.get('window').width-100,
        borderRadius:12,
        borderWidth:1,
        borderColor:'#f9ba07'
    },
    cmdText:{
        fontWeight:'900',
        fontSize:16,
    },
    iconBag:{
        color:'#f9ba07',
        marginEnd:20
    },
    btnPressed:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:90,
    },
    gold:{
        backgroundColor:'#f9ba07',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height/2,
        alignItems:'center',
        justifyContent:'center',
        borderBottomEndRadius:15,
        borderBottomStartRadius:15
    },
})

export default ProfileScreen;