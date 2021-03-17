import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ChatsScreen from '../screens/ChatsScreen';
import ContactScreen from '../screens/ContactScreen';
import { MainTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const MainTab = createMaterialTopTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <MainTab.Navigator
      initialRouteName="Chats"
      tabBarOptions={{ activeTintColor: Colors.light.background,
      
      style: {
        backgroundColor: Colors.light.tint
      },
      indicatorStyle:  {
        backgroundColor:Colors.light.background,
        height: 3
      },
      labelStyle: {
        fontWeight: 'bold'
      }
      }}>
      <MainTab.Screen
        name="Chats"
        component={ChatsScreen}
         
      />
      <MainTab.Screen
        name="Users"
        component={TabTwoNavigator}
        
      />
      <MainTab.Screen
        name="Profile"
        component={TabTwoNavigator}
        
      />
    </MainTab.Navigator>
  );
}


// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();


const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Users"
        component={ContactScreen}
        options={{ headerTitle: 'All users' }}
      />
    </TabTwoStack.Navigator>
  );
}
