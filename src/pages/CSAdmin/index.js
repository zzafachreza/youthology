import { StatusBar, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts } from '../../utils'
import { apiURL, api_token, getData, storeData } from '../../utils/localStorage'
import { MyButton, MyCalendar, MyGap, MyHeader, MyHeaderPoint, MyIcon, MyInput, MyPicker } from '../../components';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import { maskJs, maskCurrency } from 'mask-js';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios';

export default function CSAdmin({ navigation, route }) {

    const [kirim, setKirim] = useState({
        nama_lengkap: '',
        telepon: '',
        jenis_perawatan: '',
        dokter: '',
        tanggal_lahir: moment().format('YYYY-MM-DD'),
        jenis_kelamin: 'Perempuan',
        rekam_medis: '',
        alamat: '',
        tanggal_janji: moment().add(8, 'day').format('YYYY-MM-DD'),
        jam_janji: ''
    });

    const sendServer = () => {
        console.log(kirim);
        navigation.navigate('CSAdminJadwal', kirim)
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900]
        }}>
            <MyHeaderPoint />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    padding: 16,
                }}>
                    <Text style={{
                        ...fonts.headline4,
                        color: Color.blueGray[900],
                        marginBottom: 12,
                    }}>Lengkapi data pribadi milikmu untuk melanjutkan pemesanan</Text>
                    <View style={{
                        borderRadius: 12,
                        backgroundColor: Color.yellow[50],
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <MyIcon name='info-square' color={Color.yellow[500]} size={24} />
                        <Text style={{
                            marginLeft: 12,
                            ...fonts.body3,
                            color: Color.blueGray[900]
                        }}>Pastikan data yang kamu masukkan sesuai dengan kartu identitas penduduk.</Text>
                    </View>
                </View>

                <View style={{
                    padding: 16
                }}>
                    {/* Nama Lengkap */}
                    <View>
                        <Text style={{
                            ...fonts.subheadline3,
                            color: Color.blueGray[900],
                            marginBottom: 8,
                        }}>Nama Lengkap</Text>
                        <View style={{
                            height: 50,
                        }}>
                            <View style={{
                                position: 'absolute',
                                left: 12,
                                top: 13,
                            }}>
                                <MyIcon name='user-rounded' color={Color.blueGray[300]} size={24} />
                            </View>
                            <TextInput onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    nama_lengkap: x
                                })
                            }} value={kirim.nama_lengkap} placeholderTextColor={Color.blueGray[400]} placeholder='Ketikkan nama lengkap' style={{
                                ...fonts.body3,
                                flex: 1,
                                paddingLeft: 44,
                                height: 50,
                                paddingHorizontal: 12,
                                color: Color.blueGray[900],
                                borderWidth: 1,
                                borderRadius: 8,
                                borderColor: Color.blueGray[300]
                            }} />

                        </View>
                    </View>

                    <MyGap jarak={20} />
                    {/* Nomor Telepon */}
                    <View>
                        <Text style={{
                            ...fonts.subheadline3,
                            color: Color.blueGray[900],
                            marginBottom: 8,
                        }}>Nomor Telepon</Text>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                height: 50,
                                width: 70,
                                backgroundColor: Color.blueGray[100],
                                borderTopLeftRadius: 8,
                                borderBottomLeftRadius: 8,
                                borderTopWidth: 1,
                                borderWidth: 1,
                                borderBottomWidth: 1,
                                borderColor: Color.blueGray[300],
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    ...fonts.body3,
                                    color: Color.blueGray[400],
                                    marginRight: 4,
                                }}>+62</Text>
                                <MyIcon name='alt-arrow-down' color={Color.blueGray[300]} size={24} />
                            </View>
                            <TextInput value={kirim.telepon} keyboardType='phone-pad' placeholderTextColor={Color.blueGray[400]} placeholder='000-0000-0000' style={{
                                ...fonts.body3,
                                flex: 1,
                                height: 50,
                                paddingHorizontal: 12,
                                color: Color.blueGray[900],
                                borderWidth: 1,
                                borderTopRightRadius: 8,
                                borderBottomRightRadius: 8,
                                borderColor: Color.blueGray[300]
                            }} onChangeText={x => {
                                console.log(maskJs('999-9999-99999', x));
                                setKirim({
                                    ...kirim,
                                    telepon: maskJs('999-9999-99999', x)
                                })
                            }} />
                        </View>
                    </View>

                    <MyGap jarak={20} />
                    {/* Jenis Perawatan */}
                    <MyPicker iconname='cosmetic' label="Jenis Perawatan" onValueChange={x => {
                        setKirim({
                            ...kirim,
                            jenis_perawatan: x
                        })
                    }} data={[
                        {
                            label: 'Milky Laser Booster',
                            value: 'Milky Laser Booster'
                        },
                        {
                            label: 'Skin Booster',
                            value: 'Skin Booster'
                        },
                        {
                            label: 'Snowpeel Facial',
                            value: 'Snowpeel Facial'
                        }
                    ]} />
                    <MyGap jarak={20} />
                    {/* Jenis Perawatan */}
                    <MyPicker iconname='stethoscope' label="Pilih Dokter" onValueChange={x => {
                        setKirim({
                            ...kirim,
                            dokter: x
                        })
                    }} data={[
                        {
                            label: 'dr. Kristin Watson',
                            value: 'dr. Kristin Watson'
                        },
                        {
                            label: 'dr. Thomas Muller',
                            value: 'dr. Thomas Muller'
                        },
                        {
                            label: 'dr. David Da Silva',
                            value: 'dr. David Da Silva'
                        }
                    ]} />

                    <MyGap jarak={20} />
                    <MyCalendar label="Tanggal Lahir" value={kirim.tanggal_lahir} onDateChange={x => {
                        setKirim({
                            ...kirim,
                            tanggal_lahir: x
                        })
                    }} />
                    <MyGap jarak={20} />
                    <MyPicker iconname='user-rounded' label="Jenis Kelamin" onValueChange={x => {
                        setKirim({
                            ...kirim,
                            jenis_kelamin: x
                        })
                    }} data={[
                        {
                            label: 'Perempuan',
                            value: 'Perempuan'
                        },
                        {
                            label: 'Laki-laki',
                            value: 'Laki-laki'
                        },

                    ]} />
                    <MyGap jarak={20} />
                    {/* Nomor Rekam Medis */}
                    <View>
                        <Text style={{
                            ...fonts.subheadline3,
                            color: Color.blueGray[900],
                            marginBottom: 8,
                        }}>Nomor Rekam Medis</Text>
                        <View style={{
                            height: 50,
                        }}>
                            <View style={{
                                position: 'absolute',
                                left: 12,
                                top: 13,
                            }}>
                                <MyIcon name='user-heart' color={Color.blueGray[300]} size={24} />
                            </View>
                            <TextInput value={kirim.rekam_medis} onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    rekam_medis: x
                                })
                            }} placeholderTextColor={Color.blueGray[400]} placeholder='Ketikkan nomor rekam medis' style={{
                                ...fonts.body3,
                                flex: 1,
                                paddingLeft: 44,
                                height: 50,
                                paddingHorizontal: 12,
                                color: Color.blueGray[900],
                                borderWidth: 1,
                                borderRadius: 8,
                                borderColor: Color.blueGray[300]
                            }} />

                        </View>
                    </View>
                    <MyGap jarak={20} />
                    <MyInput iconname='map-point' onChangeText={x => {
                        setKirim({
                            ...kirim,
                            alamat: x
                        })
                    }} label="Alamat" placeholder="Ketikkan alamat domisili" />
                    <MyGap jarak={24} />
                    <MyButton title="Pilih Tanggal & Jam" onPress={sendServer} />

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})