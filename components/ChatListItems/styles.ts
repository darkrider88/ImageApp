import {StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const styles = StyleSheet.create({
    avatar: {
        width:60,
        height:60,
        marginRight:15,
        borderRadius:50
    },
    container: {
        flexDirection: 'row',
        width:'100%',
        justifyContent:'space-between',
        padding:10,
        margin:10
    },
    leftContainer: {
        flexDirection:'row',
        alignItems:'center',
    },
    midContainer: {
        // justifyContent:'center'
    },
    username: {
        fontWeight: 'bold',
        fontSize:18
    },
    lastMessage: {
        fontSize:16,
        color: 'grey',
        
    },
    time: {
        color:'grey',
        fontSize:12,
        paddingTop: 10

    }
});

export default styles;