/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import React, {useLayoutEffect, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import colors from '../../common/colors';
import firestore from '@react-native-firebase/firestore';

const Home = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState(0);
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerTitleStyle: {
        fontFamily: 'Lato-Bold',
        fontSize: 22,
        color: colors.black,
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../assets/images/drawer.png')}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../assets/images/logo-icon.jpeg')}
            style={{
              width: 120,
              height: 80,
              resizeMode: 'contain',
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getAllCount();
  }, []);

  const getAllCount = async () => {
    const productRef = await firestore().collection('Products').get();
    const userRef = await firestore().collection('Users').get();
    const ordersRef = await firestore().collection('Orders').get();

    setOrders(ordersRef.size);
    setProducts(productRef.size);
    setUsers(userRef.size);
  };

  return (
    <View style={{flex: 1, padding: 15}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Orders')}
        style={{
          width: '95%',
          height: '25%',
          borderRadius: 15,
          backgroundColor: colors.category1,
          alignSelf: 'center',
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginVertical: 8,
        }}>
        <Image
          style={{width: 90, height: 90, resizeMode: 'contain'}}
          source={require('../../assets/images/order.png')}
        />
        <View style={{marginLeft: 15}}>
          <Text
            style={{
              fontFamily: 'Lato-Bold',
              fontSize: 32,
              color: colors.black_level_3,
            }}>
            {orders}
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              color: colors.black_level_3,
            }}>
            Orders
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Products')}
        style={{
          width: '95%',
          height: '25%',
          borderRadius: 15,
          backgroundColor: colors.category2,
          alignSelf: 'center',
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginVertical: 8,
        }}>
        <Image
          style={{width: 90, height: 90, resizeMode: 'contain'}}
          source={require('../../assets/images/dairy-products.png')}
        />
        <View style={{marginLeft: 15}}>
          <Text
            style={{
              fontFamily: 'Lato-Bold',
              fontSize: 32,
              color: colors.black_level_3,
            }}>
            {products}
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              color: colors.black_level_3,
            }}>
            Products
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Users')}
        style={{
          width: '95%',
          height: '25%',
          borderRadius: 15,
          backgroundColor: colors.category3,
          alignSelf: 'center',
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginVertical: 8,
        }}>
        <Image
          style={{width: 90, height: 90, resizeMode: 'contain'}}
          source={require('../../assets/images/man.png')}
        />
        <View style={{marginLeft: 15}}>
          <Text
            style={{
              fontFamily: 'Lato-Bold',
              fontSize: 32,
              color: colors.black_level_3,
            }}>
            {users}
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              color: colors.black_level_3,
            }}>
            Users
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Home;

// import {View, Text, Image, TouchableOpacity} from 'react-native';
// import React, {useLayoutEffect} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import colors from '../../common/colors';

// const Home = () => {
//   const navigation = useNavigation();

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: 'Home',
//       headerStyle: {
//         backgroundColor: colors.white,
//       },
//       headerTintColor: '#000',
//       headerLeft: () => {
//         return (
//           <TouchableOpacity onPress={() => navigation.openDrawer()}>
//             <Image
//               source={require('../../assets/images/drawer.png')}
//               style={{
//                 width: 40,
//                 height: 40,
//                 resizeMode: 'contain',
//                 marginRight: 10,
//               }}
//             />
//           </TouchableOpacity>
//         );
//       },

//       headerRight: () => {
//         return (
//           <TouchableOpacity onPress={() => navigation.openDrawer()}>
//             <Image
//               source={require('../../assets/images/logo-icon.jpeg')}
//               style={{
//                 width: 120,
//                 height: 80,
//                 resizeMode: 'contain',
//                 marginRight: 10,
//               }}
//             />
//           </TouchableOpacity>
//         );
//       },
//     });
//   }, [navigation]);

//   return (
//     <View style={{flex: 1, padding: 15}}>
//       <TouchableOpacity
//         onPress={() => navigation.navigate('Orders')}
//         style={{
//           width: '95%',
//           height: '25%',
//           borderRadius: 15,
//           backgroundColor: colors.category1,
//           alignSelf: 'center',
//           padding: 15,
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'flex-start',
//           marginVertical: 8,
//         }}>
//         <Image
//           source={require('../../assets/images/order.png')}
//           style={{width: 80, height: 80, resizeMode: 'contain'}}
//         />
//         <View>
//           <Text
//             style={{
//               fontWeight: 'bold',
//               fontSize: 28,
//               color: colors.black_level_3,
//             }}>
//             1000
//           </Text>
//           <Text
//             style={{
//               fontSize: 18,
//               color: colors.black_level_3,
//             }}>
//             Orders
//           </Text>
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => navigation.navigate('Products')}
//         style={{
//           width: '95%',
//           height: '25%',
//           borderRadius: 15,
//           backgroundColor: colors.category2,
//           alignSelf: 'center',
//           padding: 15,
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'flex-start',
//           marginVertical: 8,
//         }}>
//         <Image
//           source={require('../../assets/images/dairy-products.png')}
//           style={{width: 80, height: 80, resizeMode: 'contain'}}
//         />
//         <View>
//           <Text
//             style={{
//               fontWeight: 'bold',
//               fontSize: 28,
//               color: colors.black_level_3,
//             }}>
//             800
//           </Text>
//           <Text
//             style={{
//               fontSize: 18,
//               color: colors.black_level_3,
//             }}>
//             Products
//           </Text>
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => navigation.navigate('Users')}
//         style={{
//           width: '95%',
//           height: '25%',
//           borderRadius: 15,
//           backgroundColor: colors.category3,
//           alignSelf: 'center',
//           padding: 15,
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'flex-start',
//           marginVertical: 8,
//         }}>
//         <Image
//           source={require('../../assets/images/man.png')}
//           style={{width: 80, height: 80, resizeMode: 'contain'}}
//         />
//         <View>
//           <Text
//             style={{
//               fontWeight: 'bold',
//               fontSize: 28,
//               color: colors.black_level_3,
//             }}>
//             180
//           </Text>
//           <Text
//             style={{
//               fontSize: 18,
//               color: colors.black_level_3,
//             }}>
//             Users
//           </Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };
// export default Home;
