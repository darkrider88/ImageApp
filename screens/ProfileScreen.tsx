import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet,Image } from 'react-native'
import {Auth, API, graphqlOperation} from 'aws-amplify' 

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
    console.log(user);
    return (
        <View style={styles.container}>
            <Image source={{uri:user.imageUri}} style={styles.avatar}/> 
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.status}>{user.status}</Text>
            <View style={styles.creation}>
                <Text style={styles.creatorText}>Created By Shashwat ©</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor:'white',
    },
    avatar: {
        width:200,
        height:200,
        marginRight:15,
        borderRadius:200,
        borderWidth:1,
        borderColor: 'grey',
        marginTop:20,
    },
    username: {
        fontSize:20,
        fontWeight:'bold',
        marginTop:10,
        marginBottom: 10,
    },
    status: {
        fontSize:17,
        fontWeight:'600',
        color:'rgb(49, 49, 49)'
    },
    creation: {
        position:'absolute',
        bottom:0,
        backgroundColor:'rgb(235, 235, 235)',
        height: 30,
        width:'100%',
        display: 'flex',
        alignItems:'center',
        justifyContent:'center'
        
    },
    creatorText:{
        color:'rgba(0, 0, 0, 0.612)'
    }
  });
export default ProfileScreen;
