import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { db, storage } from '../../configs/FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

export default function AddBusiness() {
    const [categoryList, setCategoryList] = useState([])
    const navigation = useNavigation()

    const {user} = useUser()
    const [image, setImage] = useState(null);
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const [category, setCategory] = useState('')
    const [website, setWebsite] = useState('')

    const [about, setAbout] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        navigation.setOptions({
            headerTitle:"Add New Business",
            headerShown: true
        })
        GetAllCategory()
    },[])

    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });
      
          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
    }

    const GetAllCategory = async () => {
        setCategoryList([])
        const q = query(collection(db,'Category'))
        const querSnapshot = await getDocs(q)

        

        querSnapshot.forEach((doc) => {
            setCategoryList(prev => [...prev, {
                label:(doc.data()).name,
                value:(doc.data()).name,
            }])
        })
    }

    const onAddNewBusiness = async () => {
        setLoading(true);
        const fileName = Date.now().toString() +'.jpg'
        const resp = await fetch(image)
        const blob = await resp.blob()

        const imageRef = ref(storage,fileName)
        uploadBytes(imageRef,blob).then((snapshot) => {
            console.log('FILE UPLOADED....')
        }).then(resp => {
            getDownloadURL(imageRef).then(async(downloadUrl) => {
                console.log(downloadUrl)
                saveBusinessDetail(downloadUrl)
            })
        })
    }

    const saveBusinessDetail= async (imageUrl) => {
        await setDoc(doc(db,'BusinessList',Date.now().toString()),{
            name:name,
            address:address,
            contact:contact,
            about:about,
            website:website,
            category:category,
            imageURL: imageUrl,
            userName: user?.fullName,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userImage: user?.imageUrl,
        })
        setLoading(false)
        ToastAndroid.show('New Business Added!!!',ToastAndroid.LONG)
    }
  return (
    <View style={{
        padding:20
    }}>
        
        <Text style={{
            fontFamily:'outfit',
            color:Colors.GRAY
        }}>Fill all details in order to add new business</Text>

        <TouchableOpacity style={{
            marginTop:20,
            display:'flex',
            alignItems: 'center',
        }}
            onPress={() => onImagePick()}
        >
            {!image ? 
            <Image style={{
                width:150,
                height:150
            }}source={require('./../../assets/images/placeholder.png')} />
            :
            <Image style={{
                width:150,
                height:150,
                borderRadius:15
            }}source={{uri:image}} />
            }
        </TouchableOpacity>
        <View>
            <TextInput placeholder='Name'
                onChangeText={(v) => {setName(v)}}
                style={{
                    padding:10,
                    borderWidth:1,
                    borderRadius:5,
                    fontSize:17,
                    backgroundColor:'#fff',
                    marginTop:10,
                    borderColor:Colors.PRIMARY
                }}
            />
            <View style={{
                        borderWidth:1,
                        borderRadius:5,
                        marginTop:10,
                        backgroundColor:'#fff',
                        borderColor:Colors.PRIMARY
                    }}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Select a Category',
                        color: Colors.GRAY,

                    }}
                    onValueChange={(v)=> setCategory(v)}
                    items={categoryList}
                />
            </View>
            <TextInput placeholder='Address'
                onChangeText={(v) => {setAddress(v)}}
                style={{
                    padding:10,
                    borderWidth:1,
                    borderRadius:5,
                    fontSize:17,
                    backgroundColor:'#fff',
                    marginTop:10,
                    borderColor:Colors.PRIMARY
                }}
            />
            <TextInput placeholder='Contact'
               onChangeText={(v) => {setContact(v)}}
                style={{
                    padding:10,
                    borderWidth:1,
                    borderRadius:5,
                    fontSize:17,
                    backgroundColor:'#fff',
                    marginTop:10,
                    borderColor:Colors.PRIMARY
                }}
            />
            <TextInput placeholder='Website'
                onChangeText={(v) => {setWebsite(v)}}

                style={{
                    padding:10,
                    borderWidth:1,
                    borderRadius:5,
                    fontSize:17,
                    backgroundColor:'#fff',
                    marginTop:10,
                    borderColor:Colors.PRIMARY
                }}
            />
            <TextInput placeholder='About'
                onChangeText={(v) => {setAbout (v)}}
                multiline
                numberOfLines={5}
                style={{
                    height:100,
                    padding:10,
                    borderWidth:1,
                    borderRadius:5,
                    fontSize:17,
                    backgroundColor:'#fff',
                    marginTop:10,
                    borderColor:Colors.PRIMARY
                }}
            />
        </View>

        <TouchableOpacity
        disabled={loading}
        style={{
            padding:15,
            backgroundColor:Colors.PRIMARY,
            borderRadius:5,
            marginTop:20,
        }}
            onPress={() => onAddNewBusiness()}
        >
            {loading?
            <ActivityIndicator size={'large'} color={'#Fff'}/>:
            <Text style={{
                textAlign: 'center',
                fontFamily:'outfit-medium',
                color:'#FFF'
            }}>Add New Business</Text>}
        </TouchableOpacity>
    </View>
  )
}