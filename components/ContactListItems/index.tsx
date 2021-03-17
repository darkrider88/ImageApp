import React, {useEffect} from 'react'
import { View, Text,Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import styles from './styles';
import { User } from '../../types';
import { useNavigation} from '@react-navigation/native'
import {listChatRooms} from '../../src/graphql/queries';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import { createChatRoom, createChatRoomUser } from '../../src/graphql/mutations'


type ContactListItemProps = {
    user: User
}

const getChatRoomById = `
    query MyQuery($id: ID!){
    getChatRoom(id: $id){
        chatRoomUsers {
          items {
            user {
              name
              id
            }
          }
        }
    }
}`;



const ContactListItem  = (props: ContactListItemProps) => {
    const {user} = props;
    const navigation = useNavigation();

    // checking if the chatroom already exist?
    async function isUserInChatRoom(userToCheckID:String) {
        //    getting the chatroom list and then we will check from that list if it exists or not
            const chatroomListData = await API.graphql(graphqlOperation(listChatRooms));
            let data = chatroomListData.data.listChatRooms.items;    
            const chatroomList = data.map((room: Object) => room.id);
            
            // getting user joined in a specific room
            for(let i=0;i<chatroomList.length;i++) {
                const rooms = await API.graphql(graphqlOperation(getChatRoomById,  {id: chatroomList[i]}));
                // comparing if the clicked user is already in some chatroom with me   
                const usersInRoom = rooms.data.getChatRoom.chatRoomUsers.items; // [ {user: {id, name}}, {user: {id,name}}]
                
                for(let j=0; j < usersInRoom.length; j++){    
                             
                    if(usersInRoom[j].user.id === userToCheckID){ // comparing the user id with the user props id
                       return chatroomList[i]; //id of the chatroom
                    }
                }
            }
            // if not in any chatroom return false
            return false;    
    }

    const onClick = async () => {   
        try {
            // checking if the chatroom already exist?
            console.log("user id ", user.id)
            let isChatRoomId = await isUserInChatRoom(user.id);
            console.log("Chatroom: " , isChatRoomId);
            if(isChatRoomId){
                // open up the chatroom
                navigation.navigate('ChatRoomScreen', {
                    id: isChatRoomId,
                    name: user.name
                });
            } else {
                //    navigate to chat room with this user
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
            }
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

