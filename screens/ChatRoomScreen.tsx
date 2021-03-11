import React from 'react'
import { View, Text,FlatList } from 'react-native'
import {useRoute} from '@react-navigation/native';
import Chats from '../data/Chats';
import ChatMessage from '../components/ChatMessage'
import InputBox from '../components/InputBox';

const ChatRoomScreen = () => {
    const route = useRoute();
   console.log(route.params);
    return (
        <View style={{flex:1}}>
            
            <FlatList 
                data={Chats.messages}
                renderItem={({item}) => <ChatMessage message={item}/>}
                inverted
            />
            <InputBox/>
        </View>
    )
}

export default ChatRoomScreen;
