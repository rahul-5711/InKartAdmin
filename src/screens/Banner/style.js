/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions, Platform} from 'react-native';
import colors from '../../common/colors';

const {width, height} = Dimensions.get('screen');
export const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  orderDetailsHeadText: {
    fontFamily: 'Lato-Bold',
    fontSize: 17,
    color: colors.primaryGreen,
    marginBottom: 10,
  },
  orderDetailsText: {
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    color: colors.placeholder,
    marginBottom: 10,
  },
  scrollView: {
    backgroundColor: colors.whitesmoke,
    padding: 15,
  },
  orderSectionView: {
    backgroundColor: colors.primaryGreen,
    borderRadius: 15,
    padding: 20,
    paddingVertical: 25,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderSectionImg: {width: 40, height: 40, marginRight: 20},
  orderSectionText1: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: colors.white,
  },
  orderSectionText2: {
    fontFamily: 'Lato-Black',
    fontSize: 20,
    color: colors.white,
  },
  orderDetailView: {margin: 10},
  orderDetailText1: {
    color: colors.primaryGreen,
    fontFamily: 'Lato-Bold',
    fontSize: 17,
    marginVertical: 15,
  },
  orderDetailView2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderDetailView3: {
    width: width * 0.1,
  },
  orderDetailView4: {
    backgroundColor: colors.primaryGreen,
    padding: 10,
    borderRadius: 6,
    justifyContent: 'center',
  },
  orderDetailText2: {
    color: colors.white,
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  orderDetailText3: {
    color: colors.black,
    fontFamily: 'Lato-Regular',
    fontSize: 40,
    marginBottom: -10,
    marginHorizontal: 10,
  },
  orderDetailView5: {
    width: width * 0.45,
  },
  orderDetailText4: {
    color: colors.black,
    fontFamily: 'Lato-Regular',
    fontSize: 15,
  },
  orderDetailText5: {
    color: colors.placeholder,
    fontFamily: 'Lato-Regular',
    fontSize: 13,
  },
  orderDetailText6: {
    width: width * 0.19,
    color: colors.black,
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    marginLeft: 15,
    textAlign: 'right',
  },
  paymentDetail: {margin: 10},
  paymentDetailView1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentDetailText1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: colors.borderGrey,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 15,
    marginVertical: 20,
  },
  addressSection: {margin: 10},
  addressSectionText1: {
    fontFamily: 'Lato-Regular',
    color: colors.black,
    fontSize: 16,
  },
  addressSectionText2: {
    fontFamily: 'Lato-Regular',
    color: colors.placeholder,
    fontSize: 14,
  },
  paymentMethodSection: {margin: 10, marginBottom: 30},
  paymentMethodView: {flexDirection: 'row', alignItems: 'center'},
  paymentMethodImg: {width: 40, height: 40, marginRight: 10},
  paymentDetailText: {
    fontFamily: 'Lato-Regular',
    color: colors.black,
    fontSize: 15,
  },
});
