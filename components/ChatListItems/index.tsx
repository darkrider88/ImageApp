import React, { useEffect, useState} from 'react'
import { View, Text,Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import styles from './styles';
import { ChatRoom } from '../../types';
import moment from 'moment';
import { useNavigation} from '@react-navigation/native'
import {Auth} from 'aws-amplify';

type ChatListItemProps = {
    chatRoom: ChatRoom
}
const ChatListItem = (props: ChatListItemProps) => {
    const {chatRoom} = props;
    const navigation = useNavigation();
    
    const [otherUser, setOtherUser] = useState(null);
    useEffect(() => {
        const getOtherUser = async () => {
            try {
                const userInfo = await Auth.currentAuthenticatedUser();
                // console.log("check: ", chatRoom.chatRoom.lastMessage.updatedAt); // do not remove this, app will crash
                if(chatRoom.chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
                    setOtherUser(chatRoom.chatRoom.chatRoomUsers.items[1].user);
                } else {
                    setOtherUser(chatRoom.chatRoom.chatRoomUsers.items[0].user);
                }
            } catch (e) {
                console.log(e);
            }
          
           
        }
        getOtherUser();
    },[]);
 
    const onClick = () => {
        navigation.navigate('ChatRoomScreen', {id: chatRoom.chatRoomID,name: otherUser.name});
     }
     if(!otherUser){
        return null;
    } 
    return (
        <TouchableOpacity onPress={onClick}> 
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={{uri: otherUser.imageUri}} style={styles.avatar}/>
                <View style={styles.midContainer}>
                    <Text style={styles.username}>{otherUser.name}</Text>
                    <Text numberOfLines={1}  style={styles.lastMessage}>{chatRoom.chatRoom.lastMessage?`${chatRoom.chatRoom.lastMessage.user.name}: ${chatRoom.chatRoom.lastMessage.content}`:''}</Text> 
                </View>  
            </View>
            {/* {moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")} */}
            <Text style={styles.time}>{chatRoom.chatRoom.lastMessage?moment(chatRoom.chatRoom.lastMessage.updatedAt).format("DD/MM/YYYY"):''}</Text> 
        </View>
        </TouchableOpacity>
    )
} 

export default ChatListItem;

