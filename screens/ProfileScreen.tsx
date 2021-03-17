import React, {useEffect, useState} from 'react'
import 
{ View,
Text,
Image,
 Modal,
 TouchableOpacity, 
 TouchableWithoutFeedback,
TextInput } from 'react-native'
import {Auth, API, graphqlOperation} from 'aws-amplify' 
import {MaterialCommunityIcons} from '@expo/vector-icons'
import styles from './ProfileStyles'
import { updateUser } from "../src/graphql/mutations";



 const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      imageUri
      status
    }
}`


const ProfileScreen = () => {
    const [user, setUser] = useState({});
    const [status, setStatus] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false)
    
    useEffect(() => {
        const fetchData = async() => {
            try {
                const userInfo = await Auth.currentAuthenticatedUser();
                const UserData = await API.graphql(graphqlOperation(getUser,{id: userInfo.attributes.sub})); 
                setUser(UserData.data.getUser);
            } catch (e) {
                console.log(e);
            }
        
        } 
        fetchData();
        
    }, []);
    
    const changeStatus = async () => {
        await API.graphql(graphqlOperation(updateUser,{input:{id:user.id, status:status}}));
        const UserData = await API.graphql(graphqlOperation(getUser,{id: user.id})); 
        setUser(UserData.data.getUser);
        setIsModalVisible(false);
    }
    const StatusModal = () => {
        return (
            <TouchableOpacity style={styles.containerModal}  onPress={() => setIsModalVisible(false)}>          
                <TouchableWithoutFeedback>
                <View style={styles.modal}>
                    <Text style={styles.modalText}>Enter your status (MAX: 200)</Text>
                    <TextInput value={status} onChangeText={(e) => setStatus(e)}  style={styles.textInput} numberOfLines={4} autoFocus={true} maxLength={200}></TextInput>
                    <TouchableOpacity onPress={changeStatus} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
                </TouchableWithoutFeedback>         
            </TouchableOpacity>
        )
    };

    return (      
        <View style={styles.container}>
            <Modal 
                animationType={'slide'}
                 transparent={true}
                 visible={isModalVisible}>
               
                <StatusModal/>
            </Modal>
            <Image source={{uri:user.imageUri}} style={styles.avatar}/> 
            <Text style={styles.username}>{user.name}</Text>
            <View style={styles.statusContainer}>
                <Text style={styles.status}>{user.status}</Text>
                <TouchableOpacity style={styles.pen} onPress={() => setIsModalVisible(true)}>
                    <MaterialCommunityIcons name="pen" size={23} color={'grey'} />
                </TouchableOpacity>
            </View>
            <View style={styles.creation}>
                <Text style={styles.creatorText}>Created By Shashwat ©</Text>
            </View>
        </View>
    )
}

export default ProfileScreen;
