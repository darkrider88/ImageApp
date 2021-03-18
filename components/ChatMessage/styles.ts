import {StyleSheet} from 'react-native';
import Colors  from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        padding:10,
        
    },
    messageBox: {
        borderRadius: 10,
        marginRight: 50,
        padding:10,
        width:'auto'
    },
    name: {
        color: Colors.light.tint,
        fontWeight:'bold',
        marginBottom:5
    },
    message: {
        fontSize:15
    },
    time: {
        alignSelf:'flex-end',
        fontSize:12,
        color: 'rgb(49, 49, 49)'
    }

})

export default styles