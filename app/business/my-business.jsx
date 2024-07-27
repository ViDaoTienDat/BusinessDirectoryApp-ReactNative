import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import ExploreBusinessListCard from '../../components/Explore/ExploreBusinessListCard'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors'

export default function MyBusiness() {
    const {user} =useUser()
    const navigation = useNavigation()
    const router = useRouter();

    const [businessList, setBusinessList] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(()=> {
        navigation.setOptions({
            headerShown:true,
            headerTitle:'My Business',
            headerStyle:{
                backgroundColor:Colors.PRIMARY
            }
        })
        user && GetUserBusiness()
    },[router])

    const GetUserBusiness= async () => {
        setLoading(true)
        setBusinessList([])
        const q = query(collection(db,'BusinessList'),where('userEmail','==',user?.primaryEmailAddress?.emailAddress))
        const querySnapshot = await getDocs(q)
        
        querySnapshot.forEach((doc) => {
            setBusinessList(prev => [...prev,{
                id:doc.id,
                ...doc.data()
            }])
        })
        setLoading(false)
    }
  return (
    <View style={{
        padding:20,

    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30,
      }}>My Business</Text>

      <FlatList 
        onRefresh={GetUserBusiness}
        refreshing={loading}
        data={businessList}
        renderItem={({item, index})=> (
            <ExploreBusinessListCard business={item}
                key={index}
            />
        )

        }
      />
    </View>
  )
}
