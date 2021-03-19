import React, {useEffect, useState} from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator} from 'react-native';
import ChatListItem from '../components/ChatListItems';
import { API, graphqlOperation, Auth} from 'aws-amplify'
import {getUser} from './queries'
import { onCreateChatRoom, onUpdateChatRoom} from '../src/graphql/subscriptions'


export default function ChatsScreen() {
  const [chatRooms, setChatRooms] = useState([]);
  const [isLoading,setIsLoading]  = useState(false);
  const fetchChatRooms = async () => {
    try {
        setIsLoading(true);
        const userInfo = await Auth.currentAuthenticatedUser();
        const userData = await API.graphql(graphqlOperation(getUser,{id: userInfo.attributes.sub}));
        console.log("chatrooms form: ",userData.data.getUser.chatRoomUser.items);
        setChatRooms(userData.data.getUser.chatRoomUser.items);
        setIsLoading(false);

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
    const sub2 = API.graphql(graphqlOperation(onCreateChatRoom)).subscribe({
      next: (data) => {fetchChatRooms()}
    })

    // cleanup
    return () => {
      subscription.unsubscribe();
      sub2.unsubscribe();
    }
  },[])

  return (
    <View style={styles.container}>
      
      <FlatList 
        style={{width:'100%'}}
        data={chatRooms}
        renderItem={({item}) => <ChatListItem chatRoom={item}/>}
        keyExtractor={(item) => item.id}
      />
      <ActivityIndicator size="large" color="black" style={styles.activity} animating={isLoading} />
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
  activity: {
    position: 'absolute',
    textAlign: 'center'
  }
});
