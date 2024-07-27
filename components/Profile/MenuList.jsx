import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Share } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function MenuList() {
    const router = useRouter()
    const { signOut} = useAuth()
    const menuList=[
        {
            id:1,
            name:'Add Business',
            icon:require('./../../assets/images/analysis.png'),
            path:'/business/add-business'
        },
        {
            id:2,
            name:'My Business',
            icon:require('./../../assets/images/add-file.png'),
            path:'/business/my-business'
        },
        {
            id:3,
            name:'Share App',
            icon:require('./../../assets/images/sharing.png'),
            path:'share'
        },
        {
            id:4,
            name:'Logout',
            icon:require('./../../assets/images/logout.png'),
            path:'logout'
        },
    ]

    const onMenuClick = (item) => {
        if(item.path == 'logout'){
            signOut()
            return;
        }
        if(item.path == 'share'){
            Share.share(
                {
                    message:'Download the Business Directory App'
                }
            )
            return;
        }
        router.push(item.path)
    }
  return (
    
    <View style={styles.container}>
      {menuList.map((item, index) => (
        <TouchableOpacity key={index} 
            onPress={() => onMenuClick(item)}
            style={styles.itemContainer}>
            <Image source={item.icon}
                style={{
                    width:30,
                    height:30,
                }}
            />
            <Text style={{
                fontFamily:'outfit-medium',
                flex:1
            }}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )

  
}
const styles = StyleSheet.create({
    container: {
        marginTop:20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'space-between'
    },
    itemContainer:{
        display: 'flex',
        
        borderWidth:1,
        borderRadius:15,
        borderColor:Colors.PRIMARY,
        padding:15,
        width:'48%',
        marginBottom:20,
        flexDirection:'row',
        alignItems:'center',
        gap:10
    },
})