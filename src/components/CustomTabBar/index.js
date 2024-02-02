/* eslint-disable prettier/prettier */
import {View, Text, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import colors from '../../common/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const CustomTabBar = () => {
  const navigation = useNavigation();
  const [active, setActive] = useState('Home');
  const activeSize = 34;
  const activeFamily = 'Lato-Bold';

  const handleNavigation = (name) => {
      setActive(name);
      navigation.navigate(name);
  }
  return (
    <View
      style={{
        height: 80,
        backgroundColor: colors.primaryGreen,
        padding: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <TouchableOpacity onPress={() => handleNavigation('Home')}>
        <AntDesign
          style={{alignSelf: 'center', marginBottom: 4}}
          name="home"
          size={active === 'Home' ? activeSize : 25}
          color={colors.white}
        />
        <Text
          style={{
            fontSize: 18,
            color: colors.white,
            fontFamily: 'Lato-Regular',
          }}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Products')}>
        <AntDesign
          style={{alignSelf: 'center', marginBottom: 4}}
          name="inbox"
          size={active === 'Products' ? activeSize : 28}
          color={colors.white}
        />
        <Text
          style={{
            fontSize: 18,
            color: colors.white,
            fontFamily: 'Lato-Regular',
          }}>
          Products
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Orders')}>
        <AntDesign
          style={{alignSelf: 'center', marginBottom: 4}}
          name="database"
          size={active === 'Orders' ? activeSize : 25}
          color={colors.white}
        />
        <Text
          style={{
            fontSize: 18,
            color: colors.white,
            fontFamily: 'Lato-Regular',
          }}>
          Orders
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Profile')}>
        <AntDesign
          style={{alignSelf: 'center', marginBottom: 4}}
          name="user"
          size={active === 'Profile' ? activeSize : 25}
          color={colors.white}
        />
        <Text
          style={{
            fontSize: 18,
            color: colors.white,
            fontFamily: 'Lato-Regular',
          }}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default CustomTabBar;
