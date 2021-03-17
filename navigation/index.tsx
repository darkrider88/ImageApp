import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, View } from 'react-native';
import Colors from '../constants/Colors';
import { Octicons, MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import NotFoundScreen from '../screens/NotFoundScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen'
import ContactScreen from '../screens/ContactScreen'
import { RootStackParamList } from '../types';
import MainTabNavigator from './MainTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ 
      headerStyle: {
        backgroundColor: Colors.light.tint,
        shadowOpacity:0,
        elevation:0
    },
    headerTitleAlign:'left',
    headerTitleStyle: {
      letterSpacing:.5,
    }
    }}>
      <Stack.Screen name="Root"
       component={MainTabNavigator}
        options={{
          title:'Shader',
          headerTintColor: 'white',
          headerRight: () => {
            return(
              <View style={{flexDirection:'row',width:90,justifyContent:'space-around',alignItems:'center'}}>
              <Octicons name='search' size = {20} color = 'white'/>
              
              <MaterialCommunityIcons name = 'dots-vertical' size={24} color = 'white'/>
            </View>
            )
          }
          }} />
      <Stack.Screen name="ChatRoomScreen"
       component={ChatRoomScreen}
        options={({route}) => ({
          title: route.params.name,
          headerTintColor: 'white',
          headerRight: () => {
            return(
          <View style={{flexDirection:'row',width:120,justifyContent:'space-around',alignItems:'center'}}  >
              <MaterialIcons name="call" size={22} color={'white'} />
              <FontAwesome5 name="video" size={19} color={'white'} />
              <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'} />

            </View>)
          },
          
        })} />

        <Stack.Screen name="Contacts" component={ContactScreen} options={{headerTintColor:'white'}} />
    </Stack.Navigator>
  );
}
