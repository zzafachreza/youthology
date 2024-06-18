import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Color, fonts } from '../../utils'
import { MyButton, MyGap, MyHeader, MyInput } from '../../components'
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';

export default function Otp({ navigation, route }) {
    const [kirim, setKirim] = useState({
        email: route.params.email,
        otp: '',
    })

    const toast = useToast();
    const sendServer = () => {
        if (kirim.otp.length == 0) {
            toast.show('Kode OTP wajib diisi !', {
                type: 'danger'
            })
        } else {
            axios.post(apiURL + 'otp', kirim).then(res => {
                console.log(res.data);
                if (res.data.status == 200) {
                    2
                    toast.show(res.data.message, {
                        type: 'success'
                    });
                    navigation.navigate('Reset', {
                        email: kirim.email
                    })
                } else {
                    toast.show(res.data.message, {
                        type: 'danger'
                    })
                }
            })
        }
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900]
        }}>
            <StatusBar backgroundColor={Color.white[900]} barStyle="dark-content" />
            <MyHeader title="Verifikasi Kode" />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                padding: 16,
            }}>
                <Text style={{
                    ...fonts.body3,
                    color: Color.blueGray[900]
                }}>Masukkan kode verifikasi yang telah kami kirimkan ke email Anda</Text>
                <MyGap jarak={20} />
                <MyInput maxLength={4} keyboardType='number-pad' onChangeText={x => setKirim({
                    ...kirim,
                    otp: x
                })} label="Kode OTP" iconname='letter' placeholder=
                    'Masukan kode OTP' />

                <MyGap jarak={20} />
                <MyButton onPress={sendServer} title="Kirim" />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})