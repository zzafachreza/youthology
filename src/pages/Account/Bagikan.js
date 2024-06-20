import { StatusBar, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowHeight } from '../../utils'
import { apiURL, api_token, getData, storeData } from '../../utils/localStorage'
import { MyButton, MyCalendar, MyGap, MyHeader, MyHeaderPoint, MyIcon, MyInput, MyPicker } from '../../components';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import { maskJs, maskCurrency } from 'mask-js';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios';
import { Icon } from 'react-native-elements';
export default function Bagikan({ navigation, route }) {
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900],
        }}>
            <StatusBar backgroundColor={Color.white[900]} barStyle="dark-content" />
            <MyHeader title="Ikuti Kami" />
            <View style={{
                flex: 1,
                padding: 16
            }}>
                <View style={{
                    flex: 1,
                    marginBottom: 12,

                }}>
                    <Image source={require('../../assets/bagikan.png')} style={{
                        width: 340,
                        height: 500,
                        resizeMode: 'contain',
                        alignSelf: 'center'
                    }} />

                </View>
                <TouchableOpacity
                    onPress={() => Linking.openURL('https://tr.ee/ca5OvMegvx')}
                    style={
                        {
                            alignSelf: 'center',
                            width: 340,
                            height: 42,
                            borderRadius: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: Color.primary[900],
                            flexDirection: 'row',

                        }
                    }
                >
                    <Icon type='ionicon' name='thumbs-up' color={Color.white[900]} size={20} />
                    <Text
                        style={{
                            left: 5,
                            ...fonts.headline5,
                            color: Color.white[900]
                        }}>
                        Ikuti Kami
                    </Text>
                </TouchableOpacity>
                {/* <MyGap jarak={10} />
                <TouchableOpacity
                    onPress={() => Linking.openURL('https://tr.ee/ca5OvMegvx')}
                    style={
                        {
                            alignSelf: 'center',
                            width: 340,
                            height: 42,
                            borderRadius: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: Color.socialMedia.youtube,
                            flexDirection: 'row',

                        }
                    }
                >
                    <Icon type='ionicon' name='logo-youtube' color={Color.white[900]} size={20} />
                    <Text
                        style={{
                            left: 5,
                            ...fonts.headline5,
                            color: Color.white[900]
                        }}>
                        Youtube
                    </Text>
                </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})