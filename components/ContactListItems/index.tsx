import React from 'react'
import { View, Text,Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import styles from './styles';
import { User } from '../../types';
import moment from 'moment';
import { useNavigation} from '@react-navigation/native'


type ContactListItemProps = {
    user: User
}
const ContactListItem  = (props: ContactListItemProps) => {
    const {user} = props;
   
    const navigation = useNavigation();
    const onClick = () => {
    //    navigate to chat room with this user
    }
    return (
        <TouchableOpacity onPress={onClick}>
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={{uri: user.imageUri}} style={styles.avatar}/>
                <View style={styles.midContainer}>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text numberOfLines={1}  style={styles.status}>{user.status}</Text> 
                </View>  
            </View>
            
        </View>
        </TouchableOpacity>
    )
} 

export default ContactListItem;

