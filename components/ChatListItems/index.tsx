import React from 'react'
import { View, Text,Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import styles from './styles';
import { ChatRoom } from '../../types';
import moment from 'moment';
import { useNavigation} from '@react-navigation/native'


type ChatListItemProps = {
    chatRoom: ChatRoom
}
const ChatListItem = (props: ChatListItemProps) => {
    const {chatRoom} = props;
    const user = chatRoom.users[0];
    const navigation = useNavigation();
    const onClick = () => {
       navigation.navigate('ChatRoomScreen', {id: chatRoom.id,name: user.name});
    }
    return (
        <TouchableOpacity onPress={onClick}>
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={{uri: user.imageUri}} style={styles.avatar}/>
                <View style={styles.midContainer}>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text numberOfLines={1}  style={styles.lastMessage}>{chatRoom.lastMessage.content}</Text> 
                </View>  
            </View>
            <Text style={styles.time}>{moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}</Text> 
        </View>
        </TouchableOpacity>
    )
} 

export default ChatListItem;

