import {StyleSheet} from 'react-native';
import Colors  from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        padding:10,
        backgroundColor: '#E5E4E2'
    },
    messageBox: {
        borderRadius: 10,
        marginRight: 50,
        padding:10,
        
    },
    name: {
        color: Colors.light.tint,
        fontWeight:'bold',
        marginBottom:5
    },
    message: {
        
    },
    time: {
        alignSelf:'flex-end',
        fontSize:12,
        color: 'grey'
    }

})

export default styles