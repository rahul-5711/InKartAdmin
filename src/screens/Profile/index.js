/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import colors from '../../common/colors';
import ImagePicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ActionSheet from 'react-native-actions-sheet';
import CustomButton from '../../components/CustomButton';
import uploadImage from '../../common/storage';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';


const Profile = () => {
  const [modalChoose, setModalChoose] = useState(false);
  const [productImage, setProductImage] = useState('');
  const actionSheetRef = useRef(null);
  const [uploadUri, setUploadUri] = useState(null);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Profile',
      headerTitleStyle: {
        fontFamily: 'Lato-Bold',
        fontSize: 22,
        color: colors.black,
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/left-arrow.png')}
            style={{
              width: 35,
              height: 35,
              resizeMode: 'contain',
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setModalChoose(false);
        console.log(image);
        if (image && image.cropRect) {
          setProductImage(image?.cropRect[0]?.uri);
        }
      })
      .catch(err => {
        console.warn(err);
      });
  };

  const handleGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.warn(image);
        actionSheetRef.current?.hide();
        if (image && image.cropRect) {
          setProductImage(image?.cropRect[0]?.uri);
        }
      })
      .catch(err => {
        console.warn(err);
      });
  };

  const editProfilePicture = async () => {
    if (uploadUri) {
      const responseUri = await uploadImage(uploadUri);
      const profileimage = {
        image: responseUri,
      };
      await firestore()
        .collection('Users')
        .add(profileimage)
        .then(() => {
          Snackbar.show({
            text: 'Updated Profile Picture',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.primaryGreen,
            textColor: colors.white,
          });
          navigation.goBack();
        });
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{marginVertical: 55}}>
      <ActionSheet ref={actionSheetRef}>
        <View style={{padding: 15}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: colors.black_level_3,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}>
            <Text
              style={{
                color: colors.black_level_2,
                fontSize: 18,
                fontFamily: 'Lato-Regular',
                lineHeight: 55,
              }}>
              Select Option
            </Text>
            <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
              <AntDesign
                name="closecircleo"
                size={25}
                color={colors.black_level_2}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingBottom: 50,
              padding: 20,
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={handleCamera}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <AntDesign name="camerao" size={40} color={colors.primaryGreen} />
              <Text
                style={{
                  color: colors.black_level_2,
                  fontSize: 18,
                  fontFamily: 'Lato-Regular',
                  lineHeight: 55,
                }}>
                Camera
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGallery}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Entypo name="image" size={40} color={colors.primaryGreen} />
              <Text
                style={{
                  color: colors.black_level_2,
                  fontSize: 18,
                  fontFamily: 'Lato-Regular',
                  lineHeight: 55,
                }}>
                Gallery
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ActionSheet>
      <TouchableOpacity
        onPress={() => actionSheetRef.current?.show()}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 15,
          marginVertical: 10,
          borderColor: colors.primaryGreen,
          borderWidth: 1,
          width:100,
          height:100,
          resizeMode:'contain',
          alignSelf:'center',
          borderRadius: 100,
        }}>
        {uploadUri ? (
          <View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                zIndex: 9,
                right: 0,
                top: -10,
                backgroundColor: colors.white_level_3,
                borderRadius: 25,
                overFlow: 'hidden',
              }}
              onPress={() => setUploadUri(null)}>
              <AntDesign
                name="closecircleo"
                size={25}
                color={colors.black_level_2}
              />
            </TouchableOpacity>
            <Image
              source={{uri: uploadUri}}
              style={{width: 100, height: 100, resizeMode: 'contain'}}
            />
          </View>
        ) : (
          <Entypo name="images" size={40} color={colors.black_level_2} />
        )}
      </TouchableOpacity>
      <CustomButton  width={'90%'} text={'Edit Profile Picture'} onPress={editProfilePicture} />
      <Image
        source={require('../../assets/images/logo-icon.jpeg')}
        style={{
          width: 130,
          height: 60,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
      />
      <Text
        style={{
          fontFamily: 'Lato-Regular',
          fontSize: 16,
          color: colors.black_level_3,
          textAlign: 'center',
        }}>
        All rights reserved
      </Text>
    </ScrollView>
  );
};
export default Profile;
