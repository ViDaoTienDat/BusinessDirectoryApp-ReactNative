import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'


export default function CategoryItem({category, onCategoryPress}) {
  
  return (
    <TouchableOpacity onPress={onCategoryPress} style={{
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
      <View style={{
        padding:15,
        backgroundColor: Colors.IG_BG,
        borderRadius:99,
        marginRight:15
      }}>
        <Image source={{uri:category.icon}}
        style={{
            width:40,
            height:40,
        }}/>
      </View>
      <Text style={{
        fontSize:12,
        fontFamily:'outfit-medium',
        marginTop:5
      }}>{category.name}</Text>
    </TouchableOpacity>
  )
}