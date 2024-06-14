import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts } from '../../utils'
import { StatusBar } from 'react-native'
import { getData } from '../../utils/localStorage';
import { MyIcon } from '../../components';
import { ImageBackground } from 'react-native';
import moment from 'moment';
import IconEdit from '../../assets/IconEdit.svg';
import IconTentang from '../../assets/IconTentang.svg';
import IconVoucher from '../../assets/IconVoucher.svg';
import IconShare from '../../assets/IconShare.svg';
import IconKeluar from '../../assets/IconKeluar.svg';


export default function Account({ navigation, route }) {
    const [user, setUser] = useState({});
    useEffect(() => {
        getData('user').then(res => {
            setUser(res)
        })
    }, []);

    const Keluar = () => {

    }

    const MyListAkun = ({ onPress, color = Color.primary[900], icon = <IconEdit />, judul = 'Edit Akun', desc = 'Ubah nama, jenis kelamin, alamat, foto', border = 1 }) => {
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={{
                    marginBottom: 12,
                    borderBottomWidth: border,
                    borderBottomColor: Color.blueGray.borderAkun,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingBottom: 12,
                }}>
                    {icon}
                    <View style={{
                        flex: 1,
                        marginHorizontal: 12,
                    }}>
                        <Text style={{
                            ...fonts.headline5,
                            color: color
                        }}>{judul}</Text>
                        <Text style={{
                            ...fonts.caption1,
                            color: Color.blueGray.artikelDesc
                        }}>{desc}</Text>
                    </View>
                    <MyIcon size={24} name='round-alt-arrow-right' color={Color.primary[900]} />
                </View>
            </TouchableWithoutFeedback>
        )
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900]
        }}>
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
                }}>Akun Saya</Text>
                <TouchableOpacity style={{
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

            <ScrollView>
                <View style={{
                    padding: 16
                }}>
                    <ImageBackground style={{
                        height: 138,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} source={require('../../assets/bgsilver.png')}>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                width: 52,
                                height: 52,
                                borderWidth: 1,
                                borderColor: Color.primary[900],
                                overflow: 'hidden',
                                borderRadius: 16,
                            }}>
                                <Image source={{
                                    uri: user.foto_user
                                }} style={{
                                    width: 52,
                                    height: 52,
                                }} />

                            </View>
                            <View style={{
                                marginLeft: 8,
                            }}>
                                <Text style={{
                                    ...fonts.headline4,
                                    color: Color.primary[900]
                                }}>{user.nama_lengkap}</Text>
                                <Text style={{
                                    ...fonts.caption1,
                                    color: Color.primary[900]
                                }}>Member Since {moment().format('DD/MM/YYYY')}</Text>
                            </View>
                        </View>
                        <View style={{
                            marginTop: 16,
                            height: 35,
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: Color.primary[900],
                            borderRadius: 100,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <MyIcon size={17} name='gift' color={Color.primary[900]} />
                            <Text style={{
                                marginHorizontal: 8,
                                ...fonts.subheadline3,
                                color: Color.primary[900],
                            }}>Silver</Text>
                            <MyIcon size={17} name='round-alt-arrow-right' color={Color.primary[900]} />
                        </View>

                    </ImageBackground>
                </View>

                <View style={{
                    flex: 1,
                    margin: 16,
                    borderWidth: 1,
                    borderRadius: 24,
                    padding: 16,
                    borderColor: Color.blueGray[100],
                }}>
                    <Text style={{
                        ...fonts.headline4,
                        color: Color.primary[900],
                        marginBottom: 12
                    }}>Pengaturan Umum</Text>

                    <MyListAkun />
                    <MyListAkun icon={<IconTentang />} judul='Tentang Aplikasi' desc='Informasi tentang aplikasi Youthology Clinic' />
                    <MyListAkun icon={<IconVoucher />} judul='Voucher Saya' desc='Daftar voucher yang saya miliki' />
                    <MyListAkun icon={<IconShare />} judul='Bagikan & Ikuti' desc='Bagikan dan ikuti instagram Youthology Clinic' />
                    <MyListAkun onPress={Keluar} icon={<IconKeluar />} color={Color.red[500]} judul='Keluar' desc='Keluar dari akun Anda' border={0} />


                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})