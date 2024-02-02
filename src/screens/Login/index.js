/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import firestore from '@react-native-firebase/firestore';
import colors from '../../common/colors';
import Snackbar from 'react-native-snackbar';
import {useDispatch} from 'react-redux';
import {login} from '../../store/actions';

const Login = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleLogin = async () => {
    if (email.trim() === 'admin@gmail.com' && password.trim() === '123') {
      await firestore()
        .collection('Users')
        .where('email', '==', email.trim().toLowerCase())
        .get()
        .then(async snapshot => {
          if (!snapshot.empty) {
            snapshot.forEach(documentSnapshot => {
              const respData = documentSnapshot.data();
              if (password.trim() === respData.password) {
                dispatch(login({userId: documentSnapshot.id}));
                Snackbar.show({
                  text: 'Login successfull',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: colors.primaryGreen,
                  textColor: colors.white,
                });
              } else {
                Snackbar.show({
                  text: 'The password you entered is wrong',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: colors.primaryGreen,
                  textColor: colors.white,
                });
              }
            });
          }
        })
        .catch(err => console.warn(err));
    } else {
      Snackbar.show({
        text: 'The entered credentials are wrong. Please chack again',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.red,
        textColor: colors.white,
      });
    }
  };
  const handleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../../assets/images/topBg.png')}
        style={{
          width: '100%',
          height: 150,
        }}
      />
      <ScrollView
        style={{
          marginTop: -25,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: 'white',
        }}>
        <Image
          source={require('../../assets/images/logo-icon.jpeg')}
          style={{
            width: 250,
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontFamily: 'Lato-Bold',
            fontSize: 22,
            textAlign: 'center',
            marginBottom: 20,
            color: colors.black,
          }}>
          Admin Login
        </Text>
        <CustomTextInput
          width={'90%'}
          border={true}
          placeholder={'E-mail'}
          onChangeText={text => setEmail(text)}
          icon={
            <Image
              source={require('../../assets/images/user.png')}
              style={{width: 25, height: 25, resizeMode: 'contain'}}
            />
          }
        />

        <CustomTextInput
          width={'90%'}
          onChangeText={text => setPassword(text)}
          border={true}
          placeholder={'Password'}
          secureTextEntry={secureTextEntry}
          icon={
            <TouchableOpacity onPress={handleSecureTextEntry}>
              <Image
                source={
                  secureTextEntry
                    ? require('../../assets/images/hide.png')
                    : require('../../assets/images/view.png')
                }
                style={{width: 25, height: 25, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          }
        />
        <CustomButton width={'90%'} text={'Login'} onPress={handleLogin} />
      </ScrollView>
    </View>
  );
};
export default Login;
