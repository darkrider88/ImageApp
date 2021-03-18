import React, {useEffect, useState} from 'react'
import 
{ View,
Text,
Image,
 Modal,
 TouchableOpacity, 
 TouchableWithoutFeedback,
TextInput,
ActivityIndicator,
ToastAndroid } from 'react-native'
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
    const [errorMsg, setErrorMsg] = useState('')
    const [count, setCount] = useState(0);
    const [indicatorOn, setIndicatorOn] = useState(false);
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
        if(status !== ''){
            setIndicatorOn(true);
            await API.graphql(graphqlOperation(updateUser,{input:{id:user.id, status:status}}));
            const UserData = await API.graphql(graphqlOperation(getUser,{id: user.id})); 
            setUser(UserData.data.getUser);
            setIndicatorOn(false);
            setIsModalVisible(false);
            setErrorMsg('');
            ToastAndroid.show("Status change success!", ToastAndroid.SHORT)
        } else {
            if(count === 0){
                setErrorMsg('Status Cannot be empty!');
                setCount(count + 1);
                setTimeout(()=> setErrorMsg(''), 2000 );
            }
            if(count === 1){
                setErrorMsg("Are you mad or what??");
                setCount(count + 1);
                setTimeout(()=> setErrorMsg(''), 2000 );
            }
            if(count === 2){
                setErrorMsg("Last time, status can't be empty :}");
                setCount(count + 1);
                setTimeout(()=> setErrorMsg(''), 2000 );
            }
            if(count === 3){
                setErrorMsg("Bye!");
                setCount(0);
                setTimeout(()=> {
                    setIsModalVisible(false);
                    setErrorMsg('')
                }, 1000 );
                
            }
        }
        
    }
    const imageToast = () => {
        ToastAndroid.show("Trying to change DP? ask developer to do that :}", ToastAndroid.SHORT)
    }
    const StatusModal = () => {
        return (
            <TouchableOpacity style={styles.containerModal}  onPress={() => setIsModalVisible(false)}>          
                <TouchableWithoutFeedback>
                <View style={styles.modal}>
                    <Text style={styles.modalText}>Enter your status (MAX: 200)</Text>
                    <TextInput selectTextOnFocus={true} value={status} onChangeText={setStatus} autoFocus  style={styles.textInput} numberOfLines={4}  ></TextInput>
                    <Text style={styles.errorMsg}>
                        {errorMsg}
                        </Text>
                    <TouchableOpacity onPress={changeStatus} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>{indicatorOn?'':'Submit'}</Text>
                        <ActivityIndicator style={styles.activityIndicator} size="small" color="white" animating={indicatorOn} />
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
            <View style={styles.avatarView}>
            <TouchableWithoutFeedback onPress={imageToast}>
            <Image source={{uri:user.imageUri}} style={styles.avatar}/> 
            </TouchableWithoutFeedback>
            </View>
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
