/* eslint-disable prettier/prettier */
import { View, Text, FlatList, Image,TouchableOpacity , ScrollView, TextInput, Dimensions, Platform} from 'react-native'
import React, {useCallback, useLayoutEffect, useState} from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import EmptyData from '../../common/EmptyData';
import CustomTextInput from '../../components/CustomTextInput';
import colors from '../../common/colors';
import { style } from './style';
import moment from 'moment'
const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const {height, width} = Dimensions.get('screen');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Orders',
      headerTitleStyle: {
        fontFamily: 'Lato-Bold',
        fontSize: 22,
        color: colors.black,
      },
      headerStyle: {
        backgroundColor: colors.white,
      },
      headerTintColor: '#000',
      headerLeft: () => {
        return (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/images/left-arrow.png')}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                marginRight: 10,
              }}
            />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation]);
  
  useFocusEffect(
    useCallback(() => {
      getOrders();
    }, []),
  );

  const getOrders = async () => {
    await firestore()
      .collection('Orders')
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
          setOrders(objArray);
        }
      });
  };


  const handleSearch = async text => {
    setSearchText(text);
    await firestore()
      .collection('Orders')
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
          setOrders([]);
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setOrders(objArray);
        }
      });
  };
  const navigateToDetails = (item) => {
    navigation.navigate("OrderDetails", { item: item });
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

  
  return (
    <View style={style.container}>
      {/* <CustomHeader drawer={false} back={true} logo={false} head={'Orders'} /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: colors.whitesmoke}}>
        {/* top filter */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: 'rgba(98,179,99,0.1)',
            paddingVertical: 15,
          }}>
          <Text style={style.activeFilterText}>Processing</Text>
          <Text style={style.inactiveFilterText}>Last 30 Days</Text>
          <Text style={style.inactiveFilterText}>February</Text>
          <Text style={style.inactiveFilterText}>January</Text>
        </View>
        {/* search */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={style.searchContainer}>
            <View style={style.searchContainerView}>
              <Image
                style={style.searchContainerImageSearch}
                source={require('../../assets/images/search.png')}
              />
              <TextInput
                style={{
                  width: width * 0.5,
                  fontFamily: 'Lato-Regular',
                  fontSize: 15,
                  color: colors.black,
                  height: Platform.OS === 'ios' ? width * 0.04 : width*0.09,
                  alignItems: 'center',
                }}
                placeholder="Search here.."
                placeholderTextColor={colors.placeholder}
                onChangeText={text => handleSearch(text)}
              />
            </View>
            <Image
              style={style.searchContainerImageMike}
              source={require('../../assets/images/voice.png')}
            />
          </View>
          <Text
            style={{
              color: colors.primaryGreen,
              fontFamily: 'Lato-Regular',
              fontSize: 18,
            }}>
            Filter
          </Text>
        </View>
        {/* orders */}
        <View style={{marginHorizontal: 20}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={orders}
            extraData={orders}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <Text
                style={{
                  fontFamily: 'Lato-Regular',
                  color: colors.black,
                  fontSize: 15,
                  textAlign: 'center',
                  marginVertical: 40,
                }}>
                No results found
              </Text>
            )}
            renderItem={({item, index}) => {
              const dateFormat = moment(new Date(item.created)).format(
                'DD/MM/YY, h:mm a',
              );
              return (
                <TouchableOpacity
                onPress={() => navigateToDetails(item)}
                  key={index}
                  style={{
                    backgroundColor: '#f0f8ff',
                    borderRadius: 15,
                    padding: 12,
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: colors.black,
                          fontSize: 15,
                        }}>
                        ID: {item.id}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: colors.primaryGreen,
                          fontSize: 13,
                        }}>
                        Ordered On: {dateFormat}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: colors.placeholder,
                          fontSize: 14,
                        }}>
                        8857 Morris Rd, CharlottesVile..
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: colors.black,
                          fontSize: 16,
                        }}>
                        Paid:{' '}
                        <Text
                          style={{
                            fontFamily: 'Lato-Regular',
                            color: colors.primaryGreen,
                          }}>
                          ₹{item?.totalAmount}
                        </Text>
                        , Items:{' '}
                        {/* <Text
                          style={{
                            fontFamily: 'Lato-Regular',
                            color: colors.primaryGreen,
                          }}>
                          {item?.cartItems.length}
                        </Text> */}
                      </Text>
                    </View>
                    <View
                      style={{
                        overflow: 'hidden',
                        borderRadius: 15,
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{
                          width: width * 0.2,
                          height: width * 0.2,
                          resizeMode: 'stretch',
                        }}
                        source={require('../../assets/images/map.webp')}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      paddingTop: 15,
                      borderTopWidth: 1,
                      borderTopColor: colors.borderGrey,
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        color: colors.black,
                        fontSize: 13,
                      }}>
                      {item.orderStatus}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        color: colors.placeholder,
                        fontSize: 13,
                      }}>
                      Rate & Review Product
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

//   return (
//     <FlatList
//     style={{flex: 1, margin: 15}}
//     data={orders}
//     extraData={orders}
//     showsVerticalScrollIndicator={false}
//     ListHeaderComponent={() => <Header />}
//     ListEmptyComponent={() => <EmptyData />}
//     renderItem={({item, index}) => (
//       <TouchableOpacity
//       onPress={() => navigation.navigate('OrderDetails')}
//         style={{
//           marginVertical: 8,
//           padding: 10,
//           width: '95%',
//           backgroundColor: colors.lightGray,
//           alignSelf: 'center',
//           borderRadius: 15,
//         }}>
      
//         <View style={{marginLeft: 10, overflow:'hidden', width: '75%'}}>
//           <Text
//             style={{
//               fontSize: 18,
//               color: colors.black_level_2,
//             }}>
//            ID: #{item?.orderId}
//           </Text>
//           <Text style={{
//               fontSize: 16,
//               color: colors.primaryGreen,
//             }}>
//             Ordered On: {item?.created}
//           </Text>
//           <Text
//           numberOfLines={2}
//             style={{
//               fontSize: 16,
//               color: 'red',
//             }}>
//             {item?.orderStatus}
//           </Text>
//           <Text
//             style={{
//               fontSize: 16,
//               color: colors.black_level_3,
//             }}>
//             {item?.totalAmount}
//           </Text>
//           <Text
//             style={{
//               fontSize: 16,
//               color: colors.category3,
//             }}>
//             {item?.userName}
//           </Text>
//           <Text
//             style={{
//               fontSize: 16,
//               color: colors.category3,
//             }}>
//            gmail {item?.userEmail}
//           </Text>
//           <Text
//             style={{
//               fontSize: 16,
//               color: colors.category3,
//             }}>
//             {item?.userPhone}
//           </Text>
//         </View>

//         {/* <Blo data={item} /> */}
//       </TouchableOpacity>
//     )}
//   />
//   )
// }

export default Orders
