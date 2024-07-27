import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { db } from '../../configs/FirebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';
export default function Intro({business}) {
  const {user} = useUser()
  const router = useRouter()  

  const onDelete = () => {
    Alert.alert('Do you want to Delete?','Do you really want to Delete this Business',[
        {
            text:'Cancel',
            style: 'cancel',
        },
        {
            text:'Delete',
            style:'destructive',
            onPress: () => deleteBusiness()
        }
    ])
  }

  const deleteBusiness = async () => {
    await deleteDoc(doc(db, "BusinessList", business.id));
    router.push('/business/my-business')
    ToastAndroid.show('Business is deleted',ToastAndroid.SHORT)
  }
  return (
    <View>
        <View style={{
            position: 'absolute',
            zIndex:10,
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            padding:20,
            marginTop:12,
            justifyContent: 'space-between'
        }}>
            <TouchableOpacity onPress={()=>router.back()}>
                <Ionicons name="arrow-back-circle" size={40} color="white" />
            </TouchableOpacity>
            <Ionicons name="heart-outline" size={40} color="white" />
        </View>
        <Image source={{uri:business?.imageURL}}
            style={{
                width: '100%',
                height:240
            }}
        />
        <View style={{
            padding:20,
            marginTop:-20,
            backgroundColor:'#fff',
            borderTopLeftRadius:25,
            borderTopRightRadius:25,
        }}>
            <View style={{
                width: '100%',
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontFamily:'outfit-bold',
                    fontSize:22
                }}>{business?.name}</Text>
                {user?.primaryEmailAddress?.emailAddress == business?.userEmail &&
                    <TouchableOpacity onPress={() => onDelete()}>
                        <Ionicons name="trash" size={30} color="red" />
                    </TouchableOpacity> 
                }
            </View>
            <Text style={{
                fontFamily:'outfit',
                fontSize:18
            }}>{business?.address}</Text>

        </View>
    </View>
  )
}