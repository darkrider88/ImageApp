import React, {useEffect, useState} from 'react';
import { StyleSheet, FlatList, View, Text} from 'react-native';
import ChatListItem from '../components/ChatListItems';
import NewMessageButton from '../components/NewMessageButton';
import { API, graphqlOperation, Auth} from 'aws-amplify'
import {getUser} from './queries'
import { onUpdateChatRoom} from '../src/graphql/subscriptions'


export default function ChatsScreen() {
  const [chatRooms, setChatRooms] = useState([]);
  const fetchChatRooms = async () => {
    try {
        const userInfo = await Auth.currentAuthenticatedUser();
        const userData = await API.graphql(graphqlOperation(getUser,{id: userInfo.attributes.sub}));
        // console.log("chatrooms form: ",userData.data.getUser.chatRoomUser.items)
        setChatRooms(userData.data.getUser.chatRoomUser.items);

    } catch (e) {
        console.log(e)
    } 
}
  useEffect(() => {
   
    fetchChatRooms();
}, []);

  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onUpdateChatRoom)).subscribe({
      next: (data:object) => {fetchChatRooms()},
      error: error => console.warn(error)
    });

    // cleanup
    return () => subscription.unsubscribe();
  },[])

  return (
    <View style={styles.container}>
      <FlatList 
        style={{width:'100%'}}
        data={chatRooms}
        renderItem={({item}) => <ChatListItem chatRoom={item}/>}
        keyExtractor={(item) => item.id}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
  },

});
