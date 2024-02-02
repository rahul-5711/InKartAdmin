/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions, Platform} from 'react-native';
import colors from '../../common/colors';

const {width, height} = Dimensions.get('screen');
export const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    margin: 15,
    backgroundColor: 'rgba(98,179,99,0.1)',
    borderColor: colors.lightGreen,
    borderWidth: 1,
  },
  searchContainerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainerImageSearch: {
    width: 25,
    height: 25,
    marginRight: 15,
    resizeMode: 'contain',
  },
  searchContainerText: {
    fontSize: 15,
    fontFamily: 'Lato-Light',
    color: colors.placeholder,
  },
  searchContainerImageMike: {
    width: 25,
    height: 25,
  },
  activeFilterText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: colors.primaryGreen,
  },
  inactiveFilterText: {
    fontFamily: 'Lato-Light',
    fontSize: 15,
    color: colors.black,
  },
});
