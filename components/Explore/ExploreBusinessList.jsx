import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import ExploreBusinessListCard from './ExploreBusinessListCard'



export default function ExploreBusinessList({businessList}) {
  return (
      <FlatList
        data={businessList}
        renderItem={({ item, index }) => (
          <ExploreBusinessListCard
            business={item}
            key={index}
          />
        )}
      /> 
   
  )
}


