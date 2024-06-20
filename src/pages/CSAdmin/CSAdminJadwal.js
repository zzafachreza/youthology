import { StatusBar, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts } from '../../utils'
import { apiURL, api_token, getData, storeData } from '../../utils/localStorage'
import { MyButton, MyCalendar, MyGap, MyHeader, MyHeaderPoint, MyIcon, MyInput, MyLoading, MyPicker } from '../../components';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import { maskJs, maskCurrency } from 'mask-js';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios';

export default function CSAdminJadwal({ navigation, route }) {

    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [kirim, setKirim] = useState(route.params);

    const [waktu, setWaktu] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.post(apiURL + 'waktu').then(res => {
            console.log(res.data);
            setWaktu(res.data)
        }).finally(() => {
            setLoading(false);
        })
    }, [])


    const sendServer = () => {
        console.log(kirim);
        navigation.navigate('CSAdminKonfirmasi', kirim)
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
                    }}>Pilih tanggal dan jam melakukan perawatan</Text>
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
                        }}>Silahkan pilih tanggal dan jam kapan kamu akan datang melakukan perawatan</Text>
                    </View>
                </View>

                <View style={{
                    padding: 16
                }}>
                    <Calendar
                        scrollable
                        maxDate={kirim.tanggal_janji_max}
                        minDate={kirim.tanggal_janji}
                        disableAllTouchEventsForDisabledDays={true}
                        theme={{

                            textDayHeaderFontFamily: fonts.body3.fontFamily,
                            textMonthFontFamily: fonts.headline4.fontFamily,
                            textDayFontFamily: fonts.headline5.fontFamily,
                            textDayFontSize: 14,
                            arrowColor: Color.primary[900],
                            selectedDayBackgroundColor: Color.secondary[900],
                            todayTextColor: Color.secondary[900]

                        }}
                        onDayPress={x => {
                            console.log(x)
                            setKirim({
                                ...kirim,
                                tanggal_janji: x.dateString
                            })
                        }}
                        markedDates={{
                            [kirim.tanggal_janji]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                        }}

                    />
                    <MyGap jarak={20} />
                    <Text style={{
                        ...fonts.headline4,
                        color: Color.blueGray[900]
                    }}>Pilih Jam Perawatan</Text>


                    {!loading && <>
                        {/* PAGI */}
                        <View style={{ marginVertical: 12, borderColor: Color.blueGray[100], borderRadius: 12, padding: 12, borderWidth: 1, }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../../assets/pagi.png')} style={{ width: 24, height: 24, }} />
                                <Text style={{ left: 6, ...fonts.headline5 }}>Pagi</Text>
                            </View>
                            <View style={{ marginVertical: 12, borderBottomWidth: 1, borderBottomColor: Color.blueGray[100] }}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <FlatList columnWrapperStyle={{
                                    flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 4, flex: 1,
                                }} style={{
                                    marginBottom: 20, flexGrow: 0
                                }} data={waktu.filter(i => i.waktu == 'Pagi')} numColumns={2} renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            if (item.akses == 'Close') {
                                                toast.show('Maaf jam tidak tersedia', {
                                                    type: 'danger'
                                                })
                                            } else {
                                                setKirim({
                                                    ...kirim,
                                                    jam_janji: item.jam
                                                })
                                            }
                                        }}>
                                            <View style={item.akses == 'Close' ? styles.btnDisable : item.jam == kirim.jam_janji ? styles.btnSelected : styles.btnAvaliable}>
                                                <Text style={item.akses == 'Close' ? styles.textDisable : item.jam == kirim.jam_janji ? styles.textSelected : styles.textAvaliable}>{item.jam}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }} />
                            </View>
                        </View>

                        {/* SIANG */}
                        <View style={{ marginVertical: 12, borderColor: Color.blueGray[100], borderRadius: 12, padding: 12, borderWidth: 1, }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../../assets/siang.png')} style={{ width: 24, height: 24, }} />
                                <Text style={{ left: 6, ...fonts.headline5 }}>Siang</Text>
                            </View>
                            <View style={{ marginVertical: 12, borderBottomWidth: 1, borderBottomColor: Color.blueGray[100] }}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <FlatList columnWrapperStyle={{
                                    flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 4, flex: 1,
                                }} style={{
                                    marginBottom: 20, flexGrow: 0
                                }} data={waktu.filter(i => i.waktu == 'Siang')} numColumns={2} renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            if (item.akses == 'Close') {
                                                toast.show('Maaf jam tidak tersedia', {
                                                    type: 'danger'
                                                })
                                            } else {
                                                setKirim({
                                                    ...kirim,
                                                    jam_janji: item.jam
                                                })
                                            }
                                        }}>
                                            <View style={item.akses == 'Close' ? styles.btnDisable : item.jam == kirim.jam_janji ? styles.btnSelected : styles.btnAvaliable}>
                                                <Text style={item.akses == 'Close' ? styles.textDisable : item.jam == kirim.jam_janji ? styles.textSelected : styles.textAvaliable}>{item.jam}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }} />
                            </View>
                        </View>

                        {/* SORE-MALAM */}
                        <View style={{ marginVertical: 12, borderColor: Color.blueGray[100], borderRadius: 12, padding: 12, borderWidth: 1, }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../../assets/malam.png')} style={{ width: 24, height: 24, }} />
                                <Text style={{ left: 6, ...fonts.headline5 }}>Sore-Malam</Text>
                            </View>
                            <View style={{ marginVertical: 12, borderBottomWidth: 1, borderBottomColor: Color.blueGray[100] }}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <FlatList columnWrapperStyle={{
                                    flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 4, flex: 1,
                                }} style={{
                                    marginBottom: 20, flexGrow: 0
                                }} data={waktu.filter(i => i.waktu == 'Sore-Malam')} numColumns={2} renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            if (item.akses == 'Close') {
                                                toast.show('Maaf jam tidak tersedia', {
                                                    type: 'danger'
                                                })
                                            } else {
                                                setKirim({
                                                    ...kirim,
                                                    jam_janji: item.jam
                                                })
                                            }
                                        }}>
                                            <View style={item.akses == 'Close' ? styles.btnDisable : item.jam == kirim.jam_janji ? styles.btnSelected : styles.btnAvaliable}>
                                                <Text style={item.akses == 'Close' ? styles.textDisable : item.jam == kirim.jam_janji ? styles.textSelected : styles.textAvaliable}>{item.jam}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }} />
                            </View>
                        </View>
                    </>}

                    {loading && <MyLoading />}



                    <MyGap jarak={24} />
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                            paddingRight: 6,
                        }}>
                            <MyButton onPress={() => navigation.goBack()} title="Kembali" backgroundColor={Color.white[900]} textColor={Color.primary[900]} borderSize={2} />
                        </View>
                        <View style={{
                            flex: 1,
                            paddingLeft: 6
                        }}>
                            <MyButton title="Lanjutkan" onPress={sendServer} />
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    btnAvaliable: {
        marginVertical: 4,
        width: 160,
        marginHorizontal: 6,
        borderRadius: 100,
        height: 35,
        backgroundColor: Color.blueGray[50],
        borderWidth: 1,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Color.blueGray[100]
    },
    textAvaliable: {
        ...fonts.subheadline3,
        color: Color.blueGray[900]
    },
    btnSelected: {
        width: 160,
        marginHorizontal: 6,
        borderRadius: 100,
        height: 35,
        backgroundColor: Color.secondary[50],
        borderWidth: 1,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Color.secondary[900]
    },
    textSelected: {
        ...fonts.subheadline3,
        color: Color.secondary[900]
    },

    btnDisable: {
        width: 160,
        marginHorizontal: 6,
        borderRadius: 100,
        height: 35,
        backgroundColor: Color.blueGray[50],
        borderWidth: 1,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Color.blueGray[100]
    },
    textDisable: {
        ...fonts.subheadline3,
        color: Color.blueGray[400]
    }

})