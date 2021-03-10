import * as React from 'react';
import { StyleSheet } from 'react-native';
import ChatListItem from '../components/ChatListItems';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';


let chatRooms = {
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
      content:'hey this is the ',
      createdAt: 10000080,
  }
}
export default function ChatsScreen() {
  return (
    <View style={styles.container}>
      <ChatListItem chatRoom={chatRooms}/>
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
