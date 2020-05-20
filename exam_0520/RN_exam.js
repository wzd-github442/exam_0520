import React, { Component } from 'react'
import { Text, View ,FlatList , Button , Image ,TouchableHighlight, StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class La extends Component{
    render(){
        return(
            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:10}}>
                <Image style={{width:220,height:220}} source={{uri:this.props.route.params.img}}/>
                <Text>歌曲名称:{this.props.route.params.name}</Text>
                <Text>歌手:{this.props.route.params.singer}</Text>
            </View>
        )
    }
}
class demo extends Component {
    constructor(){
        super()
        this.state = {albums:[],color:'red'}
    }
    componentDidMount(){
        fetch("http://www.cjlly.com:3045/record",{method:'GET'})
        .then(resp=>resp.json())
        .then(albums=>{
            this.setState({albums:albums})
        })
    }
    _del=(id)=>{
        let data=this.state.albums.splice(0)
        let index=data.findIndex(album=>album.id===id)
        data.splice(index,1)
        this.setState({albums:data})
    }
    _go(item){
        let params = item
        this.props.navigation.navigate('La',params)
    }
    _renderItem=({item,index})=>{
        return(
            <TouchableHighlight onPress={()=>this._go(item)} underlayColor='white'>
                <View style={{height:90,flexDirection:"row",marginTop:0}}>
                    <View style={{justifyContent:"flex-start", flexDirection: "row",alignItems:"center",flexGrow:1}}>
                        <Text style={[styles.tex]}>{index+1}</Text>
                        <Image style={{width:80,height:80,marginRight:30,marginTop:0}} source={{uri:item.img}}/>
                    </View>
                    <View style={{flexDirection: "row",alignItems:"center",justifyContent:'space-between',flexGrow:1}}>
                        <Text style={{width:90}}>{item.name}</Text>
                        <TouchableHighlight style={{width:50,borderRadius:5}} underlayColor='#5C9DE5' activeOpacity={0.5} 
                            onPress={()=>this._del(item.id)}>
                            <Text style={styles.button}>删除</Text>
                        </TouchableHighlight>
                    </View> 
                </View>
            </TouchableHighlight>   
        )
    }
    render() {
        return (
                <FlatList 
                    ListEmptyComponent={<Text>无数据</Text>}
                    data={this.state.albums} 
                    renderItem={this._renderItem}
                />
        )
    }
}
function App(){
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="demo">
            <Stack.Screen name="demo" component={demo} options={{title:'流行音乐排行榜'}}/>
            <Stack.Screen name="La" component={La} options={{title:'详情'}}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App 
const styles = StyleSheet.create({
    container:{color:'red'},content:{color:'green'},
    button:{backgroundColor:'#5C9DE5',width:50,height:30,borderRadius:5,textAlign:"center",textAlignVertical:'center'},
    con:{color:'yellow'},
    tex:{marginLeft:5,marginRight:5,marginTop:0}
})