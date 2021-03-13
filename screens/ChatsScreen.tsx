import React, {useEffect, useState} from 'react';
import { StyleSheet, FlatList, View} from 'react-native';
import ChatListItem from '../components/ChatListItems';

import EditScreenInfo from '../components/EditScreenInfo';
import NewMessageButton from '../components/NewMessageButton';
import { Text } from '../components/Themed';
import { API, graphqlOperation, Auth} from 'aws-amplify'
import {getUser} from './queries'

let chatRooms = [{
  id: '1a',
  users: [{
      id: 'user1',
      name: 'john',
      imageUri: 'https://www.w3schools.com/howto/img_avatar2.png',
  },
  {
  id: 'user2',
  name: 'wick',
  imageUri: 'https://www.w3schools.com/howto/img_avatar2.png'
  }],
  lastMessage: {
      id: 'm1',
      content:'hey this is the way to hello boy whaat',
      createdAt: 1615374895775,
  }
},
{
  id: '1b',
  users: [{
      id: 'user1',
      name: 'john',
      imageUri: 'https://www.w3schools.com/howto/img_avatar2.png',
  },
  {
  id: 'user2',
  name: 'wick',
  imageUri: 'https://www.w3schools.com/howto/img_avatar2.png'
  }],
  lastMessage: {
      id: 'm1',
      content:'hey this is the way to hello boy whaat',
      createdAt: 1615374895775,
  }
},
{
  id: '1c',
  users: [{
      id: 'user1',
      name: 'john',
      imageUri: 'https://www.w3schools.com/howto/img_avatar2.png',
  },
  {
  id: 'user2',
  name: 'wick',
  imageUri: 'https://www.w3schools.com/howto/img_avatar2.png'
  }],
  lastMessage: {
      id: 'm1',
      content:'hey this is the way to hello boy whaat',
      createdAt: 1615374895775,
  }
},
]
export default function ChatsScreen() {
  const [chatRooms, setChatRooms] = useState([]);
  useEffect(() => {
    const fetchChatRooms = async () => {
        try {
            const userInfo = await Auth.currentAuthenticatedUser();
            
            const userData = await API.graphql(graphqlOperation(getUser,{id: userInfo.attributes.sub}));
            setChatRooms(userData.data.getUser.chatRoomUser.items);

        } catch (e) {
            console.log(e)
        }
    }
    fetchChatRooms();
}, [])
  return (
    <View style={styles.container}>
      <FlatList 
        style={{width:'100%'}}
        data={chatRooms}
        renderItem={({item}) => <ChatListItem chatRoom={item}/>}
        keyExtractor={(item) => item.id}
      />
      <NewMessageButton/>
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
