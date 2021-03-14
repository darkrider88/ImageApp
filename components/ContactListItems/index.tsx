import React from 'react'
import { View, Text,Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import styles from './styles';
import { User } from '../../types';
import { useNavigation} from '@react-navigation/native'
import {} from '../../src/graphql/queries';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import { createChatRoom, createChatRoomUser } from '../../src/graphql/mutations'


type ContactListItemProps = {
    user: User
}
const ContactListItem  = (props: ContactListItemProps) => {
    const {user} = props;
   
    const navigation = useNavigation();
    const onClick = async () => {
    //    navigate to chat room with this user
        try {
            // 1. create new chat room
            const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, {input: {lastMessageID: "zz753fca-e8c3-473b-8e85-b14196e84e16"}}));
            if(!newChatRoomData.data){
                console.log('failed to create chatroom');
                return;
            }
            
            const newChatRoom = newChatRoomData.data.createChatRoom; // accessing the id of created chatroom

            //2. add user to chat room
            await API.graphql(graphqlOperation(createChatRoomUser, { input: {userID: user.id, chatRoomID: newChatRoom.id} }))
            // add your self to chatroom
            const userInfo = await Auth.currentAuthenticatedUser();
            await API.graphql(graphqlOperation(createChatRoomUser, {input: {userID: userInfo.attributes.sub, chatRoomID: newChatRoom.id}}))


            // open up the chatroom
            navigation.navigate('ChatRoomScreen', {
                id: newChatRoom.id,
                name: user.name
            })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <TouchableOpacity onPress={onClick}>
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={{uri: user.imageUri}} style={styles.avatar}/>
                <View style={styles.midContainer}>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text numberOfLines={1}  style={styles.status}>{user.status}</Text> 
                </View>  
            </View>
            
        </View>
        </TouchableOpacity>
    )
} 

export default ContactListItem;

