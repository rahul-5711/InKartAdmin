/* eslint-disable prettier/prettier */
import { View, Text } from 'react-native'
import React from 'react'
import colors from './colors'

const EmptyData = () => {
  return (
    <View style={{
      marginVertical: 8,
      borderRadius: 15,
      padding: 10,
      width: '95%',
      backgroundColor: colors.lightGray,
      alignSelf:'center'
    }}>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.black_level_2,
        lineHeight: 35
        }}>No results found</Text>
    </View>
  )
}

export default EmptyData