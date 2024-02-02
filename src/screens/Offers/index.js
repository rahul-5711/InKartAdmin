/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import React, {useLayoutEffect, useCallback, useState, useRef} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import colors from '../../common/colors';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import {useDimensionContext} from '../../context';
import style from './style';
import NavigationBack from '../../common/NavigationBack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ActionSheet from 'react-native-actions-sheet';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';

const Offers = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();
  const [offers, setOffers] = useState([]);
  const [offercode, setOfferCode] = useState('');
  const [offer, setOffer] = useState('');
  const [head, setHead] = useState('');
  const [subhead, setSubHead] = useState('');
  const actionSheetRef = useRef(null);
  const actionSheetRefChooseOption = useRef(null);

  const [type, setType] = useState(null);
  const [selected, setSelected] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getOffers();
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Offers',
      headerTitleStyle: {
        fontFamily: 'Lato-Bold',
        fontSize: 22,
        color: colors.black,
      },
      headerLeft: () => <NavigationBack />,
      headerRight: () => <RightComponent />,
    });
  }, [navigation]);

  const RightComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setType('add');
          actionSheetRef.current?.show();
        }}>
        <AntDesign
          style={{marginRight: 4}}
          name="plussquareo"
          size={30}
          color={colors.black_level_2}
        />
      </TouchableOpacity>
    );
  };

  const getOffers = async () => {
    await firestore()
      .collection('Offers')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Offers found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white_level_2,
          });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            console.log(document);
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setOffers(objArray);
        }
      });
  };

  const handleCreate = async () => {};

  const handleDelete = async () => {
    actionSheetRefChooseOption.current?.hide();
    Alert.alert(
      'Confirm Offer Deletion',
      'Do you want to delete this offer ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete Offer',
          onPress: async () => {
            await firestore()
              .collection('Offers')
              .doc(selected.id)
              .delete()
              .then(() => {
                Snackbar.show({
                  text: 'Banner Deleted successfully',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: colors.white_level_3,
                  textColor: colors.black_level_3,
                });
              });
            setSelected(null);
            getOffers();
          },
        },
      ],
    );
  };

  const handleCopy = async () => {
    actionSheetRefChooseOption.current?.hide();

    setTimeout(() => {
      Clipboard.setString(selected.offercode);
    }, 1000);
  };

  const handleEdit = async () => {
    // actionSheetRefChooseOption.current?.hide();
    setTimeout(() => {
      setHead(selected.head);
      setSubHead(selected.subhead);
      setOffer(selected.offer);
      setOfferCode(selected.offercode);
      setType('edit');
      actionSheetRef.current?.show();
    }, 1000);
  };

  const handleUpdateOffer = async () => {};

  return (
    <View style={responsiveStyle.main}>
      <ScrollView style={responsiveStyle.container}>
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
            <Text style={responsiveStyle.orderDetailText1}>
              {type === 'add' ? 'Create Offer' : 'Update offer'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                actionSheetRef.current?.hide();
                setType(null);
                setSelected(null);
                setHead('');
                setSubHead('');
                setOffer('');
                setOfferCode('');
              }}>
              <AntDesign
                name="closecircleo"
                size={25}
                color={colors.black_level_2}
              />
            </TouchableOpacity>
          </View>

          <View style={{marginVertical: 20}}>
            <CustomTextInput
              width={'100%'}
              value={head}
              border={true}
              placeholder={'Heading'}
              onChangeText={text => setHead(text)}
            />
            <CustomTextInput
              width={'100%'}
              value={subhead}
              border={true}
              placeholder={'Description'}
              onChangeText={text => setSubHead(text)}
            />
            <CustomTextInput
              width={'100%'}
              value={offer}
              border={true}
              placeholder={'Offer Percentage'}
              onChangeText={text => setOffer(text)}
            />
            <CustomTextInput
              width={'100%'}
              value={offercode}
              border={true}
              placeholder={'Offer Code'}
              onChangeText={text => setOfferCode(text)}
            />
            <CustomButton
              width={'100%'}
              text={type === 'add' ? 'Create' : 'Update'}
              onPress={type === 'add' ? handleCreate : handleUpdateOffer}
            />
          </View>
        </View>
      </ActionSheet>
      <ActionSheet ref={actionSheetRefChooseOption}>
        <View style={{padding: 15}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: colors.black_level_3,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}>
            <Text style={responsiveStyle.orderDetailText1}>Choose Action</Text>
            <TouchableOpacity
              onPress={() => actionSheetRefChooseOption.current?.hide()}>
              <AntDesign
                name="closecircleo"
                size={25}
                color={colors.black_level_2}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              margin: 40,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Feather
                onPress={handleEdit}
                name="edit"
                size={40}
                color={colors.black_level_2}
              />
              <Text style={responsiveStyle.orderDetailText1}>Edit</Text>
            </View>
            <View>
              <AntDesign
                onPress={handleCopy}
                name="copy1"
                size={40}
                color={colors.black_level_2}
              />
              <Text style={responsiveStyle.orderDetailText1}>Copy</Text>
            </View>
            <View>
              <AntDesign
                onPress={handleDelete}
                name="delete"
                size={40}
                color={colors.black_level_2}
              />
              <Text style={responsiveStyle.orderDetailText1}>Delete</Text>
            </View>
          </View>
        </View>
      </ActionSheet>
      <FlatList
        data={offers}
        extraData={offers}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => String(index)}
        contentContainerStyle={responsiveStyle.contentStyle}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelected(item);
                actionSheetRefChooseOption.current.show();
              }}
              style={responsiveStyle.renderView}>
              {/* start design */}
              <View style={responsiveStyle.offCircleView}>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 25 / 2,
                    backgroundColor: colors.white,
                  }}
                />
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 25 / 2,
                    backgroundColor: colors.white,
                  }}
                />
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 25 / 2,
                    backgroundColor: colors.white,
                  }}
                />
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 25 / 2,
                    backgroundColor: colors.white,
                  }}
                />
              </View>
              <View
                style={{
                  width: '65%',
                  height: 100,
                  backgroundColor: colors.secondaryGreen,
                  padding: 20,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'Lato-Black',
                      color: colors.primaryGreen,
                      fontSize: 50,
                    }}>
                    {item.offer}
                  </Text>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        color: colors.primaryGreen,
                        fontSize: 14,
                      }}>
                      %
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        color: colors.primaryGreen,
                        fontSize: 14,
                      }}>
                      OFF
                    </Text>
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Bold',
                        color: colors.black,
                        fontSize: 16,
                      }}>
                      {item.head}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        color: colors.black_level_3,
                        fontSize: 12,
                      }}>
                      {item.subhead}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  height: 100,
                  backgroundColor: colors.secondaryGreen,
                }}>
                <View style={responsiveStyle.circleCenter} />
                <View
                  style={[
                    responsiveStyle.circleCenter,
                    {
                      marginBottom: -25 / 2,
                    },
                  ]}
                />
              </View>
              <View
                style={{
                  width: '26%',
                  height: 100,
                  backgroundColor: colors.secondaryGreen,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingRight: 15,
                  paddingVertical: 15,
                }}>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    color: colors.black_level_3,
                    fontSize: 14,
                  }}>
                  Use Code
                </Text>
                <View
                  style={{
                    marginVertical: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    justifyContent: 'center',
                    borderRadius: 15,
                    backgroundColor: colors.primaryGreen,
                    overflow: 'hidden',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Lato-Regular',
                      color: colors.white_level_2,
                      textAlign: 'center',
                    }}>
                    {item.offercode}
                  </Text>
                </View>
              </View>
              {/* end design */}
              <View style={{marginLeft: -25 / 2, zIndex: 99}}>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 25 / 2,
                    backgroundColor: colors.white_level_2,
                  }}
                />
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 25 / 2,
                    backgroundColor: colors.white_level_2,
                  }}
                />
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 25 / 2,
                    backgroundColor: colors.white_level_2,
                  }}
                />
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 25 / 2,
                    backgroundColor: colors.white_level_2,
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
      </ScrollView>
    </View>
  );
};
export default Offers;
