import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Color, DimensionThisPhone, MyDimensi, colors, fonts, windowWidth } from '../../utils';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { apiURL, getData } from '../../utils/localStorage';
import MyIcon from '../MyIcon';
import axios from 'axios';

export default function MyHeaderPoint({ title = 'CS Admin', level }) {
    const navigation = useNavigation();
    const [user, setUser] = useState({});
    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            __GetUserProfile()
        }

    }, [isFocus]);


    const __GetUserProfile = () => {
        getData('user').then(uu => {
            axios.post(apiURL + 'user_data', {
                id: uu.id
            }).then(res => {
                console.log(res.data);
                setUser(res.data);
            })
        })
    }

    return (
        <View style={{
            height: 80,
            backgroundColor: Color.primary[900],
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16
        }}>
            <Text style={{
                flex: 1,
                ...fonts.headline3,
                color: Color.white[900]
            }}>{title}</Text>
            <View style={{
                flex: 0.6,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('Member')}>
                    <Image source={user.member == 'Silver' ? require('../../assets/badgeSilver.png') : user.member == 'Gold' ? require('../../assets/badgeGold.png') : require('../../assets/badgePlatinum.png')} style={{
                        width: 100,
                        resizeMode: 'contain',
                        height: 35
                    }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Notifikasi')} style={{
                    width: 40,
                    height: 40,
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: '#FFFFFF1F',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <MyIcon name='bell' size={24} color={Color.white[900]} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})