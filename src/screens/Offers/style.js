/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import colors from '../../common/colors';

const style = (width, height) =>
  StyleSheet.create({
    main: {
      flex: 1,
    },
    container: {
      backgroundColor: colors.white_level_2,
    },
    contentStyle: {
      alignSelf: 'center',
      marginVertical: height * 0.015,
      width: width * 0.9,
    },
    renderView: {
      flexDirection: 'row',
      alignItems: 'center',
      width: width,
      alignSelf: 'center',
      justifyContent: 'center',
      marginBottom: height * 0.015,
    },
    offCircleView: {marginRight: (-height * 0.02) / 2, zIndex: 99},
    circleRight: {
      width: 25,
      height: 25,
      borderRadius: 25 / 2,
      backgroundColor: colors.white_level_2,
    },
    circleCenter: {
      width: 25,
      height: 25,
      borderRadius: 25 / 2,
      backgroundColor: colors.white_level_2,
      marginTop: -25 / 2,
    },
    orderDetailText1: {
      color: colors.primaryGreen,
      fontFamily: 'Lato-Bold',
      fontSize: 17,
      marginVertical: 15,
    },
  });

export default style;