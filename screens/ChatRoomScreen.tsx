import React, {useEffect, useState} from 'react'
import { View, ImageBackground,FlatList, ActivityIndicator } from 'react-native'
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
    const [isLoading, setIsLoading] = useState(false);
    const fetchMessages = async() => {
        try {
            setIsLoading(true);
            const messagesData = await API.graphql(graphqlOperation(messagesByChatRoom,{ chatRoomID: currentChatRoomId, sortDirection: "DESC" }));
            setMessages(messagesData.data.messagesByChatRoom.items);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
        
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
                next: ({provider, value}) => {
                    
                    
                     // this notifications comes for every new message created and its our responsibility to check if it is for this chat romm or not
                    if(value.data.onCreateMessage.chatRoomID !== route.params.id) { // others message
                        return;
                    }
                    fetchMessages();
                    // setMessages([newMessage,...messages]);
                }
            });
            
             
        
        // cleanup function
        return () => subscription.unsubscribe();
    },[])

    return (
        <View style={{flex:1}}>
            <ImageBackground source={require('../assets/images/background.jpg')} style={{flex:1}}>
            <ActivityIndicator style={{position:'absolute',alignSelf:'center',top:'40%'}} size="large" color="white" animating={isLoading} />
            <FlatList 
                data={messages}
                renderItem={({item}) => <ChatMessage myId={myId} message={item}/>}
                inverted
            />
        </ImageBackground>
            <InputBox chatRoomID={currentChatRoomId}/>
        </View>
        
    )
}

export default ChatRoomScreen;
