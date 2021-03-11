import { Entypo, FontAwesome5, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import React, { useState} from 'react'
import { View, Text,TextInput, TouchableOpacity } from 'react-native'
import styles from './styles'

const InputBox = () => {
    const [message, setMessage] = useState('');

    const onMicrophonePress = () => {
        console.warn('Microphone');
    }

    const onSendPress = () => {
        console.warn('Send');
        setMessage('');
    }

    const onPress = () => {
        if(!message){
            onMicrophonePress();
        } else{
            onSendPress();
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
              <FontAwesome5 name="laugh-beam" size={24} color='grey'/>
              <TextInput 
                style={styles.textInput} 
                multiline
                maxLength={3000}
                placeholder={'Type a message'}
                onChangeText = {setMessage}
                // scrollEnabled={true}
                />
              <Entypo name="attachment" size={20} color='grey' style={styles.icons}/>
              {!message && <Fontisto name="camera" size={20} color='grey' style={styles.icons}/>}
            </View>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.buttonContainer}>
                    {!message?<MaterialCommunityIcons name="microphone" size={24} color={'white'}/>: <MaterialIcons name="send" size ={25} color={'white'}/> }
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default InputBox;
