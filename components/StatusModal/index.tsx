import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = 85;

const StatusModal = () => {
    return (
        <View style={styles.container}>
            <View style={styles.modal}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        height: HEIGHT,
        width: WIDTH - 80,
        backgroundColor: '#f2f2f2',
        borderRadius: 20
    }
});

export default StatusModal
