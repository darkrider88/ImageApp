import * as React from 'react';
import { StyleSheet, FlatList, View} from 'react-native';

import ContactListItem from '../components/ContactListItems';

const user = [{
  id: 'user1',
  name: 'John',
  imageUri: 'https://www.w3schools.com/howto/img_avatar2.png',
  status: 'world is good'
},
{
  id: 'user2',
  name: 'Boyy',
  imageUri: 'https://www.w3schools.com/howto/img_avatar2.png',
  status: 'Glitch in the Matrix'
},
]

export default function ChatsScreen() {
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