import React, {useEffect, useState} from 'react'
import { View, Text,FlatList } from 'react-native'
import {useRoute} from '@react-navigation/native';
// import Chats from '../data/Chats';
import ChatMessage from '../components/ChatMessage'
import InputBox from '../components/InputBox';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {messagesByChatRoom} from '../src/graphql/queries';

const ChatRoomScreen = () => {
    const route = useRoute();
    
    const [messages, setMessages] = useState([]);
    const [myId, setMyId] = useState(null);
    useEffect(() => {
        const fetchMessages = async() => {
            const messagesData = await API.graphql(graphqlOperation(messagesByChatRoom,{ chatRoomID:route.params.id, sortDirection: "DESC" }));
            setMessages(messagesData.data.messagesByChatRoom.items);
        }
        fetchMessages();
    },[]);

    useEffect(() => {
        const getMyId = async() => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyId(userInfo.attributes.sub); 
        }
        getMyId();  
    },[])
    return (
        <View style={{flex:1}}>
            
            <FlatList 
                data={messages}
                renderItem={({item}) => <ChatMessage myId={myId} message={item}/>}
                inverted
            />
            <InputBox chatRoomID={route.params.id}/>
        </View>
    )
}

export default ChatRoomScreen;
