import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#4CC417',
        height:60,
        width:60,
        borderRadius:60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right:20,
        bottom: 30,
        shadowColor: 'black',
        shadowOffset: {width:0,height:2},
        shadowRadius:1,
        shadowOpacity:0.8,
        elevation: 7

    }
});

export default styles;