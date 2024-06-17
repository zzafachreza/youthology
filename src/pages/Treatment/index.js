import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import { apiURL, getData } from '../../utils/localStorage';
import { MyGap, MyHeaderPoint, MyIcon } from '../../components';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import { useIsFocused } from '@react-navigation/native';

export default function Treatment({ navigation, route = {
    open: 'Perawatan'
} }) {
    const [pilih, setPilih] = useState(route.params.open == 'Jadwal' ? 1 : 0);
    const systemFonts = [fonts.body3.fontFamily, fonts.headline4.fontFamily];
    const [dataKulit, setDataKulit] = useState([
        {
            judul: '',
            tanggal: '',
            jam: '',
            image: '',

        }
    ]);



    const [dataJawdal, setDataJadwal] = useState([
        {
            nama_perawatan: 'Milky Laser Booster',
            tanggal_janji: '2024-06-23',
            jam_janji: '09:00',

        },
    ]);

    const [tmp, setTmp] = useState([
        {
            perawatan: 'Milky Laser Booster',
            tanggal: '2024-06-23',
            jam_mulai: '09:00',
            jam_selesai: '10:00'
        }, {
            perawatan: 'Skin Booster',
            tanggal: '2024-06-05',
            jam_mulai: '13:00',
            jam_selesai: '14:00'
        }, {
            perawatan: 'Snowpeel Facial',
            tanggal: '2024-06-10',
            jam_mulai: '11:00',
            jam_selesai: '12:00'
        },
        {
            perawatan: 'Derma Collagen',
            tanggal: '2024-05-28',
            jam_mulai: '14:00',
            jam_selesai: '16:00'
        }
    ]);

    const [selectKulit, setSelectKulit] = useState(0);
    const [loading, setLoading] = useState(false);
    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus) {
            __GetDataKulit();
            __getJadwal();
        }
    }, [isFocus]);
    const __getJadwal = () => {
        getData('user').then(uu => {
            axios.post(apiURL + 'appointment', {
                fid_user: uu.id
            }).then(res => {
                console.log('jadwal', res.data);
                setDataJadwal(res.data);
            })
        })
    }
    const __GetDataKulit = () => {
        setLoading(true);
        axios.post(apiURL + 'artikel', {
            tipe: 'Masalah Kulit'
        }).then(res => {
            console.log(res.data);
            let TMP = [...res.data];
            res.data.map((itm, idx) => {
                TMP[idx].cek = idx == 0 ? 1 : 0
            })
            setDataKulit(TMP);
        }).finally(() => {
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        })
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900]
        }}>
            <MyHeaderPoint title='Perawatan' />

            {/* BATAS HEADER */}
            <View style={{
                marginVertical: 8,
                marginHorizontal: 16,
                borderRadius: 12,
                padding: 4,
                backgroundColor: Color.blueGray[50],
                flexDirection: 'row'
            }}>
                <TouchableWithoutFeedback onPress={() => setPilih(0)}>
                    <View style={{
                        flex: 1,
                        height: 35,
                        borderRadius: 8,
                        backgroundColor: pilih == 0 ? Color.white[900] : Color.blueGray[50],
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            ...fonts.subheadline3,
                            color: pilih == 0 ? Color.blueGray[900] : Color.blueGray[500]
                        }}>Perawatan</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setPilih(1)}>
                    <View style={{
                        flex: 1,
                        height: 35,
                        borderRadius: 8,
                        backgroundColor: pilih == 1 ? Color.white[900] : Color.blueGray[50],
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            ...fonts.subheadline3,
                            color: pilih == 1 ? Color.blueGray[900] : Color.blueGray[500]
                        }}>Jadwal Saya</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            {/* SUB HALAMAN TREATMENT */}
            {/* TREATMENT */}
            {pilih == 0 && !loading &&

                <View style={{
                    padding: 16
                }}>
                    <FlatList showsHorizontalScrollIndicator={false} data={dataKulit} horizontal renderItem={({ item, index }) => {
                        return (
                            <TouchableWithoutFeedback onPress={() => {
                                let TMP = [...dataKulit];
                                TMP.map((i, idx) => {
                                    if (i.judul == item.judul) {
                                        TMP[idx].cek = 1;

                                    } else {
                                        TMP[idx].cek = 0;
                                    }
                                });
                                setDataKulit(TMP);

                                setSelectKulit(index)


                            }}>
                                <View style={{
                                    paddingVertical: 4,
                                    paddingHorizontal: 24,
                                    backgroundColor: item.cek > 0 ? Color.primary[50] : Color.white[900],
                                    borderColor: item.cek > 0 ? Color.primary[900] : Color.blueGray[100],
                                    borderRadius: 100,
                                    marginRight: 8,
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        ...fonts.subheadline3,
                                        color: item.cek > 0 ? Color.primary[900] : Color.blueGray[500],
                                    }}>{item.judul}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }} />


                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{
                            padding: 16,
                        }}>
                            <Text style={{
                                ...fonts.headline2,
                                color: Color.blueGray[900]
                            }}>{dataKulit[selectKulit].judul}</Text>
                            <View style={{
                                marginVertical: 8,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>

                                <MyIcon name='user-circle' size={40} color={Color.blueGray[400]} />

                                <View style={{
                                    marginLeft: 12
                                }}>
                                    <Text style={{
                                        ...fonts.subheadline3,
                                        color: Color.blueGray[900],

                                    }}>{dataKulit[selectKulit].author}</Text>
                                    <Text style={{
                                        ...fonts.caption1,
                                        color: Color.blueGray[400]
                                    }}>{moment(dataKulit[selectKulit].tanggal).format('dddd, DD MMMM YYYY')}, {dataKulit[selectKulit].jam}</Text>


                                </View>

                            </View>



                            <RenderHtml
                                tagsStyles={{
                                    p: {
                                        fontFamily: fonts.body3.fontFamily,
                                        textAlign: 'justify',
                                        lineHeight: 26,
                                    },
                                }}
                                systemFonts={systemFonts}
                                contentWidth={windowWidth}
                                source={{
                                    html: dataKulit[selectKulit].keterangan
                                }}
                            />



                        </View>
                    </ScrollView>


                </View>


            }
            {/* JADWAL */}
            {pilih === 1 &&
                <View style={{
                    padding: 16
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
                                    let TMPSrc = dataJawdal.filter(i => i.perawatan.toLowerCase().indexOf(x.toLowerCase()) > -1);
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
                    <FlatList showsVerticalScrollIndicator={false} data={dataJawdal} renderItem={({ item, index }) => {
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
                    }} />
                </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})