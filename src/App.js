import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Router from './routes';
import { LogBox, Pressable, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Color, colors } from './utils/colors';

import PushNotification, { Importance } from 'react-native-push-notification';
import { storeData } from './utils/localStorage';
import { ToastProvider, useToast } from 'react-native-toast-notifications'
import { MyIcon } from './components';
import { fonts } from './utils';
import { Icon } from 'react-native-elements';



export default function App() {
  LogBox.ignoreAllLogs();
  const toastACT = useToast();

  const navigationRef = useRef();

  PushNotification.createChannel(
    {
      channelId: 'YouthologyID', // (required)
      channelName: 'YouthologyID', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: true, // (optional) default: true // (optional) See `soundName` parameter of `localNotification` function
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      local_notification: true, // prevent loop

    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

  // Must be outside of any component LifeCycle (such as `componentDidMount`).
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.warn('TOKEN SAYA:', token);
      storeData('token', token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);

      // if (notification.title == 'Klaim Voucher') {
      //   navigationRef.current?.navigate('VoucherSaya')
      // } else if (notification.title == 'Jadwal Perawatan') {
      //   navigationRef.current?.navigate('JadwalSaya');

      // } else {
      //   navigationRef.current?.navigate('Notifikasi');
      // }

      // getPushNotifikasi(notification.title, notification.message);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      // console.log('ACTION:', notification.action);
      // console.log('NOTIFICATION:', notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });





  return (
    <NavigationContainer ref={navigationRef}>
      <ToastProvider
        duration={2000}
        placement="bottom"
        animationDuration={250}
        animationType='zoom-in'
        successColor={Color.blueGray[50]}
        successIcon={<MyIcon name='check-circle' color={Color.tealGreen[500]} size={24} />}
        dangerColor={<MyIcon name='close-circle' color={Color.tealGreen[500]} size={24} />}
        renderToast={(toast) => {
          return (
            <View style={{
              backgroundColor: Color.blueGray[50],
              padding: 10,
              width: '85%',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Color.blueGray[100],
              flexDirection: 'row',
            }}>
              {toast.type == 'success' ? <MyIcon name='check-circle' color={Color.tealGreen[500]} size={24} /> : toast.type == 'warning' ? <MyIcon name='info-circle' color={Color.blueGray[400]} size={24} /> : <MyIcon name='close-circle' color={Color.red[500]} size={24} />}
              <Text style={{
                left: 10,
                flex: 1,
                ...fonts.body3,
                color: Color.primary[900]
              }}>{toast.message}</Text>
              {/* <Pressable>
                <Icon type='ionicon' name='close' color={Color.blueGray[400]} />
              </Pressable> */}
            </View>
          )
        }}
      >
        <Router />
      </ToastProvider>
      <FlashMessage position="bottom" />
    </NavigationContainer>
  );
}
