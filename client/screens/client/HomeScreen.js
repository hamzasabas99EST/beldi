import * as React from 'react';
import {Icon } from 'native-base'
import {
  Text,
  Image,
  TextInput,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity
  
} from 'react-native';

console.disableYellowBox = true
const Data = [
  {
    id: 1,
    Key: 'Tacos De Lyon Gourmet',
    subtitle:'Tacos . Burger',
    note:4.1,
    image:require('../../assets/rest_1.png'),
    commandeMin:39,
    fraisLivraison:5,
    minTime:35,
    maxTime:45
  },
  {
    id: 2,
    Key: 'Tacos De Lyon narcos',
    subtitle:'Tacos . Burger',
    note:4.1,
    image:require('../../assets/rest_2.png'),
    commandeMin:40,
    fraisLivraison:6,
    minTime:32,
    maxTime:44
  },
  {
    id: 3,
    Key: 'Tacos De Lyon beldi',
    subtitle:'Tacos . Burger',
    note:4.1,
    image:require('../../assets/rest_3.png'),
    commandeMin:72,
    fraisLivraison:3,
    minTime:25,
    maxTime:40
  },
  {
    id: 4,
    Key: 'Tacos De Lyon ensas',
    subtitle:'Tacos . Burger',
    note:4.1,
    image:require('../../assets/rest_4.png'),
    commandeMin:25,
    fraisLivraison:10,
    minTime:36,
    maxTime:48
  },
];

export default class FlatLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      renderData:Data
    };
  } 

  onPressHandler(id) {
    let renderData=[...this.state.renderData];
    for(let data of renderData){
      if(data.id==id){
        data.selected=(data.selected==null)?true:!data.selected;
        break;
      }
    }
    this.setState({renderData});
  }

  render() {
    
    return (
      <View style={styles.container}>
            <View style={styles.search}> 
                <Image style={styles.icon} source={require('../../assets/search.png')}/>
                <TextInput placeholder="Search ..."/>
            </View>
            <FlatList
                style={styles.flatList}
                horizontal={true}
                data={[
                {key: 'Devin'},
                {key: 'Dan'},
                {key: 'Dominic'},
                {key: 'Jackson'},
                {key: 'James'},
                {key: 'Joel'},
                {key: 'John'},
                {key: 'Jillian'},
                {key: 'Jimmy'},
                {key: 'Julie'},
                ]}
                renderItem={({item}) => 
                <Text style={styles.item} onPress={()=>alert(item.key)}>{item.key}</Text>
                }
            />
            <FlatList
                style={styles.restFlatList}
                data={Data}
                renderItem={({item}) => 
                <TouchableOpacity 
                  onPress={()=>this.props.navigation.navigate('RestFood',item)}
                  style={styles.card}>
                      <Image style={styles.imgRest} source={item.image}/>
                      <View style={styles.cardButtom}>
                          <Text style={styles.title}>{item.Key}</Text>
                          <Text style={styles.sub}>{item.subtitle}</Text>
                          <View style={styles.not}>
                              <Icon
                                name={"star"}
                                style={[styles.star,{color:item.selected==true ? "#f9ba07" : "#a9a9a9"}]}
                                onPress={() => this.onPressHandler(item.id)}
                                />
                            <Text style={styles.textnote}>{item.note} . $</Text>
                           </View>
                       </View>
                </TouchableOpacity>
                }
            />
        </View>
      );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center', 
      paddingTop:60,
    },
    search:{
      flexDirection:'row',
      backgroundColor:'#e8e4e4',
      width:'80%',
      height:40,
      alignItems:'center',
      borderRadius:20
    },
    icon:{
      width:20,
      height:20,
      marginStart:10,
      marginEnd:10,
    },
    flatList:{
      width:'90%',
      marginTop:10,
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
  restFlatList:{
      width:'90%',
      height:100,
      marginTop:-420,
  },
  card:{
      backgroundColor:'white',
      paddingBottom:20,
      borderColor:'#e6dcdc',
      borderWidth:1.5,
      borderRadius:8,
      marginBottom:6
  },
  imgRest:{
      height:180,
      width:'100%',
      alignSelf:'center',
      borderRadius:8
      },
  title:{
      color:'black',
      fontSize:20,
      marginTop:15
  },
  sub:{
      color:'gray'
  },
  not:{
      flexDirection:'row',
      color:'gray',
      },
  cardButtom:{
      marginStart:10
  },
  star:{
      fontSize: 20,
      marginEnd:10
      },
  textnote:{
      alignSelf:'center'
  }
});