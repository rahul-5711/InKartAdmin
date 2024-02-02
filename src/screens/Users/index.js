/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useLayoutEffect, useState, useCallback} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import colors from '../../common/colors';
import NavigationBack from '../../common/NavigationBack';
import firestore from '@react-native-firebase/firestore';
import CustomTextInput from '../../components/CustomTextInput';
import Snackbar from 'react-native-snackbar';
import EmptyData from '../../common/EmptyData';
const Users = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Users',
      headerTitleStyle: {
        fontFamily: 'Lato-Bold',
        fontSize: 22,
        color: colors.black,
      },
      headerStyle: {
        backgroundColor: colors.white,
      },
      headerTintColor: '#000',
      headerLeft: () => <NavigationBack />,
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      getUsers();
    }, []),
  );

  const getUsers = async () => {
    await firestore()
      .collection('Users')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'no users found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setUsers(objArray);
        }
      });
  };

  const Header = () => (
    <CustomTextInput
      width={'95%'}
      border={true}
      value={searchText}
      placeholder={'Search here...'}
      onChangeText={text => handleSearch(text)}
      icon={
        <Image
          source={require('../../assets/images/search.png')}
          style={{width: 25, height: 25, resizeMode: 'contain'}}
        />
      }
    />
  );

  const handleSearch = async text => {
    setSearchText(text);
    await firestore()
      .collection('Users')
      .orderBy('username')
      .startAt(text)
      .endAt(text + '\uf8ff')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No results found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
          setUsers([]);
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setUsers(objArray);
        }
      });
  };

  const BlockUser = ({data}) => {
    return (
      <TouchableOpacity
        onPress={() => handleBlockUser(data)}
        style={{
          padding: 2,
          borderRadius: 8,
          borderColor: data?.active === 0 ? colors.red : colors.primaryGreen,
          borderWidth: 1,
          position: 'absolute',
          top: 5,
          right: 5,
          width: 65,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily:'Lato-Bold',
            fontSize: 15,
            color: data?.active === 0 ? colors.red : colors.primaryGreen,
            lineHeight: 35,
          }}>
          {data?.active === 1 ? ' Block' : 'Unblock'}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleBlockUser = async data => {
    await firestore()
      .collection('Users')
      .doc(data.id)
      .update({
        active: data?.active === 1 ? 0 : 1,
      })
      .then(() => {
        const updated_users = users.map(obj => {
          if (obj.id === data?.id) {
            obj.active = data?.active === 1 ? 0 : 1;
          }
          return obj;
        });
        setUsers(updated_users);
      });
  };
  return (
    <FlatList
      style={{flex: 1, margin: 15}}
      data={users}
      extraData={users}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => <Header />}
      ListEmptyComponent={() => <EmptyData />}
      renderItem={({item, index}) => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginVertical: 8,
            padding: 10,
            width: '95%',
            backgroundColor: colors.lightGrey1,
            alignSelf: 'center',
            borderRadius: 15,
          }}>
          <Image
            source={
              item?.profileimage
                ? {uri: item?.profileimage}
                : require('../../assets/images/user.png')
            }
            style={{
              width: 80,
              height: 80,
              resizeMode: 'contain',
              borderRadius: 40,
              overflow: 'hidden',
            }}
          />
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                fontFamily:'Lato-Bold',
                fontSize: 18,
                color: colors.black_level_2,
              }}>
              {item?.username}
            </Text>
            <Text
              style={{
                fontFamily:'Lato-Regular',
                fontSize: 16,
                color: 'red',
              }}>
              {item?.email}
            </Text>
            <Text
              style={{
                fontFamily:'Lato-Regular',
                fontSize: 16,
                color: colors.black_level_3,
              }}>
              {item?.mobilenumber}
            </Text>
          </View>

          <BlockUser data={item} />
        </View>
      )}
    />
  );
};

export default Users;
