import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import BusinessItem from './BusinessItem'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
export default function BusinessList() {
  const [businessList, setBusinessList] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  useEffect(()=> {
    GetBusinessList()
  },[])
  const GetBusinessList = async () => {
    setBusinessList([])
    setLoading(true)
    const q = query(collection(db,'BusinessList'));
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, {id:doc.id , ...doc.data()}])
    })

    setLoading(false)
  }
  return (
    <View style={{
      marginBottom:40
    }}>
       <View style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop:10,
        }}>
            <Text style={{
                fontSize:20,
                fontFamily:'outfit-bold',
                }}>Popular Business 
            </Text>
            <View style={{
              display:'flex',
              flexDirection:'row',
              gap:5
            }}>
              <TouchableOpacity onPress={GetBusinessList}>
                <Ionicons name="refresh" size={24} color={Colors.PRIMARY} />
              </TouchableOpacity>
              <Text style={{color:Colors.PRIMARY,fontFamily:'outfit-medium'}}>View All</Text>
            </View>
        </View>
       <FlatList 
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{marginLeft:20}}
        renderItem={({item, index}) => (
          <BusinessItem business={item}/>
        )}
       />
    </View>
  )
}