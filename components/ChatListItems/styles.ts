import {StyleSheet, Dimensions } from 'react-native';

const widthOfMobile = Dimensions.get('window').width - 115;
const styles = StyleSheet.create({
    avatar: {
        width:60,
        height:60,
        marginRight:15,
        borderRadius:50,
        borderWidth:0.4,
        borderColor: 'grey',
    },
    container: {
        flexDirection: 'row',
        width:'100%',
        justifyContent:'space-between',
        padding:10,
        margin:5
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
        width: widthOfMobile
    },
    time: {
        color:'grey',
        fontSize:12,
        paddingTop: 20,
        paddingRight:10,
        position:'absolute',
        right:10,

    }
});

export default styles;