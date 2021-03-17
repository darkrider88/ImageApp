import React, {useEffect, useState} from 'react';
import { StyleSheet, FlatList, View} from 'react-native';
import { API, graphqlOperation} from 'aws-amplify';
import ContactListItem from '../components/ContactListItems';
import { listUsers } from '../src/graphql/queries';


export default function ChatsScreen() {
  const [user, setUser] = useState([]);
  // fetching the users list from graphql api in aws
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await API.graphql(graphqlOperation(listUsers));
        setUser(userData.data.listUsers.items)
      } catch (error) {
          console.error(error);
      }
    }
    fetchUser();
  },[])
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