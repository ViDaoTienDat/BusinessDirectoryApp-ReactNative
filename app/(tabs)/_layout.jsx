import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from './../../constants/Colors';

export default function TabLayout() {
  
  return (
    <Tabs screenOptions={
      {
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY
      }
    }>
      <Tabs.Screen name='home'
      options={{
        tabBarLabel: 'Home',
        tabBarIcon:({color}) => <Entypo name="home" size={24} color={color} />
      }}/>
      <Tabs.Screen name='explore'
      options={{
        tabBarLabel: 'Explore',
        tabBarIcon:({color}) => <MaterialIcons name="explore" size={24} color={color} />
      }}/>
      <Tabs.Screen name='profile'
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon:({color}) => <AntDesign name="user" size={24} color={color}/>
      }}/>
    </Tabs>
  )
}