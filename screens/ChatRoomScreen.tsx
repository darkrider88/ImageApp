import React, {useEffect, useState} from 'react'
import { View, Text,FlatList } from 'react-native'
import {useRoute} from '@react-navigation/native';
import ChatMessage from '../components/ChatMessage'
import InputBox from '../components/InputBox';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {messagesByChatRoom} from '../src/graphql/queries';
import {onCreateMessage} from '../src/graphql/subscriptions';

const ChatRoomScreen = () => {
    const route = useRoute();
    const currentChatRoomId = route.params.id;
    const [messages, setMessages] = useState([]);
    const [myId, setMyId] = useState(null);

    const fetchMessages = async() => {
      
        const messagesData = await API.graphql(graphqlOperation(messagesByChatRoom,{ chatRoomID: currentChatRoomId, sortDirection: "DESC" }));
        setMessages(messagesData.data.messagesByChatRoom.items);
    }

    useEffect(() => {
        fetchMessages();
    },[]);

    useEffect(() => {
        const getMyId = async() => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyId(userInfo.attributes.sub); 
        }
        getMyId();  
    },[]);

    // adding subscription the realtime feature for messaging
    // creating a useEffect for subscription
    useEffect(() => {
        const subscription = API.graphql(
            graphqlOperation(onCreateMessage)).subscribe({ 
                next: (data) => {
                    
                    const newMessage = data.value.data.OnCreateMessage;
                     // this notifications comes for every new message created and its our responsibility to check if it is for this chat romm or not
                     console.log("subscription: ",data);
                    // if(newMessage.chatRoomID !== route.params.id) { // others message
                    //     return;
                    // }
                    fetchMessages();
                    // setMessages([newMessage,...messages]);
                }
            });
            
        
        // cleanup function
        // return () => subscription.unsubscribe();
    },[])

    return (
        <View style={{flex:1}}>
            
            <FlatList 
                data={messages}
                renderItem={({item}) => <ChatMessage myId={myId} message={item}/>}
                inverted
            />
            <InputBox chatRoomID={currentChatRoomId}/>
        </View>
    )
}

export default ChatRoomScreen;
