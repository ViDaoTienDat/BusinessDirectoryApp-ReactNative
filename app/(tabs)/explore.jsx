import { View, Text , TextInput, ScrollView} from 'react-native'
import React, { useState } from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import Category from '../../components/Home/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList';

export default function explore() {
  const [businessList, setBusinessList] = useState([])
  const GetBusinessByCategory = async (category) => {
    setBusinessList([])
    const q = query(collection(db,'BusinessList'),where("category",'==',category))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      console.log("Query snapshot:", doc.data())
      setBusinessList(prev => [...prev,{id: doc.id, ...doc.data()}])
    })
  }
  return (
    <View style={{
      padding:20,
      marginTop:20,
      flex:1
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30
      }}>Explore More</Text>
      {/* Search Bar */}
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        gap:10,
        alignItems:'center',
        backgroundColor:'#fff',
        padding:10,
        marginVertical:10,
        marginTop:15,
        borderRadius:8,
        borderWidth:1,
        borderColor:Colors.PRIMARY
      }}>
          <EvilIcons name="search" size={24} color={Colors.PRIMARY}/>
          <TextInput placeholder='Search...' 
            style={{
              fontFamily:'outfit',
              fontSize:16,
            }}
          />      
      </View>
      {/* Category */}
      
      <Category explore={true} onCategorySelect={(categoryName) => GetBusinessByCategory(categoryName)}/>

      {/* Business List */}

      <ExploreBusinessList businessList={businessList}/>
    </View>
  )
}