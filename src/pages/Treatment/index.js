import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts } from '../../utils'
import { StatusBar } from 'react-native'
import { getData } from '../../utils/localStorage';
import { MyGap, MyHeaderPoint, MyIcon } from '../../components';
import moment from 'moment';
import { Icon } from 'react-native-elements';

export default function Treatment({ navigation, route }) {
    const [pilih, setPilih] = useState(0);
    const [kulit, setKulit] = useState([
        {
            name: 'Kulit Berjerawat',
            cek: 1,
        },
        {
            name: 'Kulit Kusam',
            cek: 0,
        },
        {
            name: 'Kulit Kendur',
            cek: 0
        },
        {
            name: 'Flek Hitam',
            cek: 0,
        },
    ]);


    const [dataJawdal, setDataJadwal] = useState([
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
            {pilih == 0 &&
                <View style={{
                    padding: 16
                }}>
                    <FlatList showsHorizontalScrollIndicator={false} data={kulit} horizontal renderItem={({ item, index }) => {
                        return (
                            <TouchableWithoutFeedback onPress={() => {
                                let TMP = [...kulit];
                                TMP.map((i, idx) => {
                                    if (i.name == item.name) {
                                        TMP[idx].cek = 1;

                                    } else {
                                        TMP[idx].cek = 0;
                                    }
                                });
                                setKulit(TMP);
                                console.log(TMP);


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
                                    }}>{item.name}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }} />

                    <ScrollView style={{
                        marginTop: 24,
                    }} showsVerticalScrollIndicator={false}>
                        <View style={{
                            padding: 16,
                        }}>
                            <Text style={{
                                ...fonts.headline2,
                                color: Color.blueGray[900]
                            }}>Perawatan Untuk {kulit.filter(i => i.cek > 0)[0].name}</Text>
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
                                        color: Color.blueGray[900]
                                    }}>Admin</Text>
                                    <Text style={{
                                        ...fonts.caption1,
                                        color: Color.blueGray[400]
                                    }}>{moment().format('dddd, DD MMMM YYYY, HH:mm')}</Text>
                                </View>

                            </View>

                            <Image style={{
                                marginTop: 12,
                                height: 230,
                                width: '100%',
                                resizeMode: 'stretch'
                            }} source={require('../../assets/ar1.png')} />

                            <Text style={{
                                marginTop: 12,
                                ...fonts.body3,
                                color: Color.blueGray[900]
                            }}>Figma ipsum component variant main layer. Layout list layout boolean shadow scrolling effect. Font bullet asset overflow create. Align rotate scale stroke blur star vector auto. Team pencil scrolling edit scale.</Text>
                            <Text style={{
                                marginTop: 12,
                                ...fonts.headline4,
                                color: Color.blueGray[900]
                            }}>Ragam Perawatan {kulit.filter(i => i.cek > 0)[0].name}</Text>
                            <Image style={{
                                marginTop: 12,
                                height: 230,
                                width: '100%',
                                resizeMode: 'stretch'
                            }} source={require('../../assets/ar1.png')} />

                            <Text style={{
                                marginTop: 12,
                                ...fonts.body3,
                                color: Color.blueGray[900]
                            }}>Figma ipsum component variant main layer. Layout list layout boolean shadow scrolling effect. Font bullet asset overflow create. Align rotate scale stroke blur star vector auto. Team pencil scrolling edit scale.</Text>
                            <Text style={{
                                marginTop: 12,
                                ...fonts.headline4,
                                color: Color.blueGray[900]
                            }}>Jenis Treatment yg Cocok</Text>
                            <Image style={{
                                marginTop: 12,
                                height: 250,
                                width: '100%',
                                resizeMode: 'contain'
                            }} source={require('../../assets/cocok.png')} />
                            <MyGap jarak={150} />
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
                            <TouchableWithoutFeedback>
                                <View style={{
                                    height: 80,
                                    width: '100%',
                                    borderWidth: 1,
                                    borderColor: Color.blueGray[400],
                                    backgroundColor: index % 2 == 1 ? Color.secondary[900] : Color.primary[900],
                                    borderRadius: 12,
                                    marginBottom: 12,
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
                                            }}>{item.perawatan}</Text>
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
                                            }}>{moment(item.tanggal).format('DD MMMM YYYY')}</Text>

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
                                            }}>{item.jam_mulai} - {item.jam_selesai}</Text>

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