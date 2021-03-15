import { StatusBar } from 'expo-status-bar';
import React,{useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { withAuthenticator, } from 'aws-amplify-react-native';
import Amplify, {Auth, API, graphqlOperation} from 'aws-amplify';
import { getUser } from './src/graphql/queries'
import { createUser } from './src/graphql/mutations'
import config from './src/aws-exports';
Amplify.configure(config)


const randomImages = [
'https://static.wikia.nocookie.net/pokemon/images/e/e2/133Eevee.png',
'https://static.wikia.nocookie.net/pokemon/images/3/39/007Squirtle.png',
'https://static.wikia.nocookie.net/pokemon/images/0/0d/025Pikachu.png',
'https://static.wikia.nocookie.net/pokemon/images/6/60/258Mudkip.png',
'https://static.wikia.nocookie.net/pokemon/images/9/9b/155Cyndaquil.png',
'https://static.wikia.nocookie.net/pokemon/images/8/8a/483Dialga.png',
'https://static.wikia.nocookie.net/pokemon/images/7/73/004Charmander.png'

]

function App() {

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  }
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  // run this to save user to graphql api
  useEffect(() => {
    const fetchUser = async () => {
      // get Authenticated user from session
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});
      if(userInfo){
        // get user from backend with user id from auth ..backend
        const userData = await API.graphql(graphqlOperation(getUser, {id: userInfo.attributes.sub}));
      
      
        if(userData.data.getUser){
          console.log("user is already register in db");
          return;
        }

        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImage(),
          status: 'hey there, you little cookie',
        }

        await API.graphql(graphqlOperation(createUser,{input: newUser}))
      }

    }
    fetchUser();
  }, [])



  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);