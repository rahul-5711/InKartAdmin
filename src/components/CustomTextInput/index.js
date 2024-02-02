/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TextInput} from 'react-native';
import colors from '../../common/colors';

const CustomTextInput = props => {
  const {
    placeholder,
    value,
    onChangeText,
    icon,
    border,
    secureTextEntry,
    width,
    borderColor,
    multiline,
  } = props;
  return (
    <View
      style={{
        flexDirection: icon ? 'row' : 'column',
        alignItems: icon ? 'center' : 'baseline',
        borderWidth: border ? 1 : 0,
        alignSelf: 'center',
        borderRadius: 8,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        width: width,
        padding: 5,
        marginVertical: 10,
        borderColor: colors.primaryGreen,
        backgroundColor: colors.white_level_3,
      }}>
      <TextInput
        secureTextEntry={secureTextEntry}
        selectionColor={colors.primaryGreen}
        placeholderTextColor={colors.black_level_3}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        style={{
          color: colors.black_level_2,
          fontFamily: 'Lato-Regular',
          fontSize: 16,
          height: multiline ? 100 : 'default',
          width:'100%',
        }}
      />
      {icon ? icon : null}
    </View>
  );
};
export default CustomTextInput;
