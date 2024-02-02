/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import colors from '../../common/colors';
import EmptyData from '../../common/EmptyData';
import CustomTextInput from '../../components/CustomTextInput';
import NavigationBack from '../../common/NavigationBack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const Products = () => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const {width, height} = Dimensions.get('screen');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Products',
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
        onPress={() => navigation.navigate('CreateProduct', {type: 'create'})}>
        <AntDesign
          style={{marginRight: 4}}
          name="plussquareo"
          size={30}
          color={colors.black_level_2}
        />
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      getProducts();
    }, []),
  );

  const getProducts = async () => {
    await firestore()
      .collection('Products')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Products found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            console.log(document);
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setProducts(objArray);
        }
      });
  };

  const Header = () => (
    <CustomTextInput
      width={'100%'}
      border={true}
      value={searchText}
      placeholder={'Search Here.'}
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
      .collection('Products')
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
          setProducts([]);
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setProducts(objArray);
        }
      });
  };

  const handleDelete = async productData => {
    Alert.alert(
      'Confirm Product Deletion',
      'Do you want to delete this product, deleting the product will lose the product data',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await firestore()
              .collection('Products')
              .doc(productData.id)
              .delete()
              .then(() => {
                Snackbar.show({
                  text: 'Product Deleted successfully',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: colors.primaryGreen,
                  textColor: colors.white,
                });
              });
            getProducts();
          },
        },
      ],
    );
  };

  const handleEdit = productData => {
    navigation.navigate('CreateProduct', {type: 'edit', data: productData});
  };

  return (
    <FlatList
      style={{flex: 1, padding: 15}}
      contentContainerStyle={{paddingBottom: 100}}
      showsVerticalScrollIndicator={false}
      data={products}
      numColumns={2}
      extraData={products}
      ListHeaderComponent={() => <Header />}
      ListEmptyComponent={() => <EmptyData />}
      renderItem={({item, index}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetails', {product: item})}
          style={{
            marginLeft: index % 2 === 1 ? 15 : 0,
            marginVertical: 8,
            borderRadius: 15,
            width: '48%',
            height: height * 0.32,
            borderColor: colors.primaryGreen,
            borderWidth: 1,
            alignSelf: 'center',
            overflow: 'hidden',
          }}>
          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Feather
              onPress={() => handleEdit(item)}
              name="edit"
              size={25}
              color={colors.black_level_2}
            />
            <AntDesign
              onPress={() => handleDelete(item)}
              name="delete"
              size={25}
              color={colors.black_level_2}
              style={{marginLeft: 10}}
            />
          </View>

          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: colors.white,
              width: '95%',
              height: height * 0.15,
              // borderRadius: 15,
              marginVertical: 5,
              marginTop: 30,
            }}>
            <Image
              source={
                item?.image
                  ? {uri: item?.image}
                  : require('../../assets/images/user.png')
              }
              style={{
                width: 80,
                height: 80,
                resizeMode: 'contain',
                overflow: 'hidden',
              }}
            />
          </View>

          <View style={{marginLeft: 10, overflow: 'hidden', width: '75%'}}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Lato-Bold',
                fontSize: 20,
                color: colors.primaryGreen,
                lineHeight: 35,
              }}>
              {item?.name}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                fontFamily: 'Lato-Regular',
                fontSize: 16,
                color: colors.black_level_1,
              }}>
              {item?.desc}
            </Text>
            <Text
              style={{
                fontFamily: 'Lato-Bold',
                fontSize: 18,
                color: colors.black_level_3,
                lineHeight: 35,
              }}>
              ₹{item?.price}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default Products;

// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import React, {useCallback, useLayoutEffect, useState} from 'react';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';
// import Snackbar from 'react-native-snackbar';
// import EmptyData from '../../common/EmptyData';
// import CustomTextInput from '../../components/CustomTextInput';
// import colors from '../../common/colors';
// import NavigationBack from '../../common/NavigationBack';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const navigation = useNavigation();
//   const {height, width} = Dimensions.get('screen');
//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: 'Products',
//       headerStyle: {
//         backgroundColor: colors.white,
//       },
//       headerTintColor: '#000',
//       headerLeft: () => {
//         return (
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Image
//               source={require('../../assets/images/left-arrow.png')}
//               style={{
//                 width: 30,
//                 height: 30,
//                 resizeMode: 'contain',
//                 marginRight: 10,
//               }}
//             />
//           </TouchableOpacity>
//         );
//       },
//       headerRight: () => <RightComponent />,
//     });
//   }, [navigation]);

//   const RightComponent = () => {
//     return (
//       <TouchableOpacity
//       onPress={() => navigation.navigate('CreateProduct')}
//       >
//         <AntDesign
//           name="plussquareo"
//           size={30}
//           style={{marginRight: 4}}
//           color={colors.black}
//         />
//       </TouchableOpacity>
//     );
//   };

//   useFocusEffect(
//     useCallback(() => {
//       getProducts();
//     }, []),
//   );

//   const getProducts = async () => {
//     await firestore()
//       .collection('Products')
//       .get()
//       .then(snapshot => {
//         if (snapshot.empty) {
//           Snackbar.show({
//             text: 'no users found',
//             duration: Snackbar.LENGTH_LONG,
//             backgroundColor: colors.red,
//             textColor: colors.white,
//           });
//         } else {
//           const objArray = [];
//           snapshot?.docs.forEach(document => {
//             const result = {id: document.id, ...document?.data()};
//             objArray.push(result);
//           });
//           setProducts(objArray);
//         }
//       });
//   };

//   const handleSearch = async text => {
//     setSearchText(text);
//     await firestore()
//       .collection('Products')
//       .orderBy('username')
//       .startAt(text)
//       .endAt(text + '\uf8ff')
//       .get()
//       .then(snapshot => {
//         if (snapshot.empty) {
//           Snackbar.show({
//             text: 'No results found',
//             duration: Snackbar.LENGTH_LONG,
//             backgroundColor: colors.red,
//             textColor: colors.white,
//           });
//           setProducts([]);
//         } else {
//           const objArray = [];
//           snapshot?.docs.forEach(document => {
//             const result = {id: document.id, ...document?.data()};
//             objArray.push(result);
//           });
//           setProducts(objArray);
//         }
//       });
//   };

//   const Header = () => (
//     <CustomTextInput
//       width={'100%'}
//       border={true}
//       value={searchText}
//       placeholder={'Search here...'}
//       onChangeText={text => handleSearch(text)}
//       icon={
//         <Image
//           source={require('../../assets/images/search.png')}
//           style={{width: 25, height: 25, resizeMode: 'contain'}}
//         />
//       }
//     />
//   );

//   return (
//     <FlatList
//       style={{flex: 1, padding: 15, backgroundColor: colors.lightGrey}}
//       data={products}
//       extraData={products}
//       numColumns={2}
//       showsVerticalScrollIndicator={false}
//       ListHeaderComponent={() => <Header />}
//       ListEmptyComponent={() => <EmptyData />}
//       renderItem={({item, index}) => (
//         <TouchableOpacity
//           onPress={() => navigation.navigate('ProductDetails', {product: item})}
//           style={{
//             marginVertical: 8,
//             width: '48%',
//             height: height * 0.3,
//             backgroundColor: colors.white_level_3,
//             alignSelf: 'center',
//             borderRadius: 15,
//             justifyContent: 'center',
//             marginLeft: index % 2 === 1 ? 15 : 0,
//             borderColor: colors.primaryGreen,
//             borderWidth: 1,
//             overflow: 'hidden',
//           }}>
//           <View
//             style={{
//               alignItems: 'center',
//               // backgroundColor: colors.white,
//               width: '95%',
//               height: height * 0.15,
//               alignSelf: 'center',
//               //borderRadius: 15,
//               marginVertical: 5,
//               // marginBottom: 50,
//             }}>
//             <Image
//               source={
//                 item?.image
//                   ? {uri: item?.image}
//                   : require('../../assets/images/user.png')
//               }
//               style={{
//                 width: 70,
//                 height: 70,
//                 resizeMode: 'contain',
//                 borderRadius: 40,
//                 overflow: 'hidden',
//               }}
//             />
//           </View>
//           <View style={{marginLeft: 10, overflow: 'hidden', width: '75%'}}>
//             <Text
//               numberOfLines={2}
//               style={{
//                 fontSize: 18,
//                 color: colors.primaryGreen,
//                 fontWeight: '600',
//               }}>
//               {item?.name}
//             </Text>
//             <Text
//               numberOfLines={2}
//               style={{
//                 fontSize: 16,
//                 color: colors.black_level_3,
//               }}>
//               {item?.description}
//             </Text>
//             <Text
//               style={{
//                 fontSize: 18,
//                 color: colors.black,
//                 lineHeight: 30,
//                 fontWeight: '600',
//               }}>
//               {item?.price}
//             </Text>
//           </View>

//           {/* <Blo data={item} /> */}
//         </TouchableOpacity>
//       )}
//     />
//   );
// };

// export default Products;
