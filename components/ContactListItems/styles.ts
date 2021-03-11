import {StyleSheet, Dimensions } from 'react-native';

const widthOfMobile = Dimensions.get('window').width - 115;
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
        fontWeight: '700',
        fontSize:16
    },
    status: {
        fontSize:15,
        color: 'grey',
        width: widthOfMobile
    },
    
});

export default styles;