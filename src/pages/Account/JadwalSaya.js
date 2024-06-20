import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import { apiURL, getData } from '../../utils/localStorage';
import { MyEmpty, MyGap, MyHeader, MyHeaderPoint, MyIcon, MyLoading } from '../../components';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import { useIsFocused } from '@react-navigation/native';

export default function JadwalSaya({ navigation, route }) {


    const [dataJawdal, setDataJadwal] = useState([]);
    const [tmp, setTmp] = useState([]);
    const [loading, setLoading] = useState(true);
    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus) {
            __getJadwal();
        }
    }, [isFocus]);
    const __getJadwal = () => {
        setLoading(true);
        getData('user').then(uu => {
            axios.post(apiURL + 'appointment', {
                fid_user: uu.id
            }).then(res => {
                console.log('jadwal', res.data);
                setDataJadwal(res.data);
                setLoading(false);
            })
        }).finally(() => {
            // setLoading(false);
        })
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900]
        }}>
            <StatusBar backgroundColor={Color.white[900]} barStyle="dark-content" />
            <MyHeader title="Jadwal Saya" />
            <View style={{
                flex: 1,
                padding: 16,
            }}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                        height: 50,
                        marginRight: 8
                    }}>
                        <View style={{
                            position: 'absolute',
                            left: 12,
                            top: 13,
                        }}>
                            <MyIcon name='magnifer' color={Color.blueGray[300]} size={24} />
                        </View>
                        <TextInput onChangeText={x => {


                            if (x.length > 0) {
                                let TMPSrc = dataJawdal.filter(i => i.nama_perawatan.toLowerCase().indexOf(x.toLowerCase()) > -1);
                                if (TMPSrc.length > 0) {
                                    setDataJadwal(TMPSrc);
                                }
                            } else {
                                setDataJadwal(tmp);
                            }

                        }} placeholderTextColor={Color.blueGray[400]} placeholder='Cari treatment' style={{
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

                    <TouchableOpacity style={{
                        height: 50,
                        width: 110,
                        borderWidth: 2,
                        borderRadius: 8,
                        borderColor: Color.primary[900],
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <MyIcon name='filter' color={Color.primary[900]} size={24} />
                            <Text style={{
                                marginLeft: 8,
                                ...fonts.headline4,
                                color: Color.primary[900],
                            }}>Filter</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginTop: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 12,
                }}>
                    <Text style={{
                        ...fonts.headline4,
                        color: Color.blueGray[900]
                    }}>Semua Jadwal Perawatan</Text>

                </View>
                {!loading && <FlatList ListEmptyComponent={<MyEmpty />} showsVerticalScrollIndicator={false} data={dataJawdal} renderItem={({ item, index }) => {
                    return (
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('JadwalDetail', item)}>
                            <View style={{
                                marginBottom: 12,
                                height: 80,
                                width: '100%',
                                borderWidth: 1,
                                borderColor: Color.blueGray[400],
                                backgroundColor: index % 2 == 1 ? Color.secondary[900] : Color.primary[900],
                                borderRadius: 12,
                                marginRight: 8,
                                overflow: 'hidden',
                            }}>
                                <View style={{
                                    backgroundColor: Color.white[900],
                                    height: 80,
                                    borderRadius: 12,
                                    width: '100%',
                                    left: 8,
                                    padding: 12,
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: 4,
                                    }}>
                                        <Text style={{
                                            ...fonts.headline5,
                                            flex: 1,
                                            color: Color.blueGray[900],
                                        }}>{item.nama_perawatan}</Text>
                                        <MyIcon name='calendar-mark' size={24} color={index % 2 == 1 ? Color.secondary[900] : Color.primary[900]} />
                                    </View>

                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <MyIcon name='calendar' size={16} color={Color.blueGray[400]} />
                                        <Text style={{
                                            ...fonts.caption1,
                                            marginLeft: 4,
                                            color: Color.blueGray[400]
                                        }}>{moment(item.tanggal_janji).format('DD MMMM YYYY')}</Text>

                                        <View style={{
                                            marginHorizontal: 8,
                                        }}>
                                            <Icon type='ionicon' name='ellipse' size={6} color={Color.blueGray[400]} />
                                        </View>
                                        <MyIcon name='clock-square' size={16} color={Color.blueGray[400]} />
                                        <Text style={{
                                            ...fonts.caption1,
                                            marginLeft: 4,
                                            color: Color.blueGray[400]
                                        }}>{moment(moment().format('YYYY-MM-DD ' + item.jam_janji)).format('HH:mm')} - {moment(moment().format('YYYY-MM-DD ' + item.jam_janji)).add(1, 'hours').format('HH:mm')}</Text>

                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }} />}
                {loading && <MyLoading />}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})