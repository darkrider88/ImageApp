import { Entypo, FontAwesome5, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import React, { useState, useEffect} from 'react';
import { View,TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import {Auth, graphqlOperation,API} from 'aws-amplify';
import {createMessage, updateChatRoom} from '../../src/graphql/mutations'


const InputBox = (props) => {
    const {chatRoomID} = props;
    const [message, setMessage] = useState('');
    const [myUserID, setMyUserID] = useState(null);
    useEffect(() => {
        const fetchUser = async () =>{
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyUserID(userInfo.attributes.sub);
        }
        fetchUser();
    },[]);

    const onMicrophonePress = () => {
        console.warn('Microphone');
    }

    const onSendPress = async () => {
        const updateChatroomLastMessage = async(messageID: string) => {
            try {
                await API.graphql(graphqlOperation(updateChatRoom, {input: {id: chatRoomID, lastMessageID: messageID}}));
            } catch (e) {
                
            }

        }
        try {
           const newMessageData = await API.graphql(graphqlOperation(createMessage,{input: {
                content: message,
                userID: myUserID,
                chatRoomID:chatRoomID
            }}));
            await updateChatroomLastMessage(newMessageData.data.createMessage.id);
            
        } catch (e) {
            console.log(e);
        }
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
