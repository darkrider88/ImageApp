import {StyleSheet, Dimensions } from 'react-native'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = 175;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor:'white',
    },
    statusContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerModal:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: 'rgba(31, 30, 30,0.6)'
    },
    pen:{
        backgroundColor: '#f3f3f3',
        borderRadius: 40,
        height:40,
        width:40,
        alignItems:'center',
        justifyContent:'center',
        elevation:7

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
        color:'rgb(49, 49, 49)',
        marginHorizontal: 15
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
    },
    modal: {
        height: HEIGHT,
        width: WIDTH - 50,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        
    },
    textInput: {
        backgroundColor: 'white',
        height: 40,
        marginTop: 10,
        borderRadius: 5,
        width: '80%',
        padding: 10
    },
    modalText: {
        fontSize: 16,
        fontWeight:'700',
        marginTop: 10,
    },
    errorMsg: {
        fontWeight: '700',
        color: 'red'
    },
    submitButton: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor:'rgb(16, 21, 27)',
        width:80,
        height: 40,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 10
        
    },
    submitButtonText: {
        color: 'white'
    },
    activityIndicator: {
        position: 'absolute',
        
    }
  });

  export default styles;