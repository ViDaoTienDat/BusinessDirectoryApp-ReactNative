import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from './../../constants/Colors'
import { router, useRouter } from 'expo-router'
export default function BusinessItem({business}) {
  const router= useRouter()
  return (
    <TouchableOpacity style={{
        padding:5,
        backgroundColor:'#fff',
        borderRadius:15,
        marginRight:10,
        
    }}
      onPress={()=> router.push('/businessdetail/'+ business.id)}
    >
      <View style={{
        width:200
      }}>
        <Image source={{uri:business.imageURL}}
        style={{
          height:130,
          borderRadius:15
        }}/>
        <Text style={{
          marginTop:5,
          marginLeft:5,
          fontFamily:'outfit-bold',
          fontSize:12
        }}>{business.name}</Text>
        <Text style={{
          marginTop:5,
          marginLeft:5,
          color: Colors.GRAY,
          fontFamily:'outfit-medium',
          fontSize:10,
        }}
          numberOfLines={1}
        >{business.address}</Text>
      </View>
      <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-between",
        marginTop:5,
      }}>
        <View style={{
          display:'flex',
          flexDirection:'row',
          gap:4,
          marginLeft:5,
          marginTop:5,
        }}>
          <Image source={require('./../../assets/images/star.png')} style={{
            width:15,
            height:15,
          }} />
          <Text style={{
            fontFamily:'outfit',
            fontSize:10
          }}>4.5</Text>
        </View>
        <Text
        style={{
          fontFamily:'outfit',
          backgroundColor:Colors.PRIMARY,
          color:'#fff',
          padding:3,
          fontSize:10,
          borderRadius:5,
        }}>{business.category}</Text>
      </View>
    </TouchableOpacity>
  )
}