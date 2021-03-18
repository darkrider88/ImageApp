import React, {useEffect, useState} from 'react';
import { StyleSheet, FlatList, View} from 'react-native';
import { API, graphqlOperation} from 'aws-amplify';
import ContactListItem from '../components/ContactListItems';
import { listUsers } from '../src/graphql/queries';
import {onUpdateUser} from '../src/graphql/subscriptions';

export default function ChatsScreen() {
  const [user, setUser] = useState([]);
  // fetching the users list from graphql api in aws
  const fetchUser = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(listUsers));
      setUser(userData.data.listUsers.items)
    } catch (error) {
        console.error(error);
    }
  }
  useEffect(() => {
    fetchUser();
  },[]);

  // if user changes his status or image update the things here also
  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onUpdateUser)).subscribe({
      next: ({value}) => {
          fetchUser();
      }
    })

    return () => subscription.unsubscribe();
  },[]);
    return (
      <View style={styles.container}>
        <FlatList 
          style={{width:'100%'}}
          data={user}
          renderItem={({item}) => <ContactListItem user={item}/>}
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