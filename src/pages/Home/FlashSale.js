import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowHeight, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import { apiURL, getData } from '../../utils/localStorage';
import KulitBerjerawat from '../../assets/KulitBerjerawat.svg'
import KulitKusam from '../../assets/KulitKusam.svg'
import KulitKendur from '../../assets/KulitKendur.svg'
import FlekHitam from '../../assets/FlekHitam.svg'
import { MyButton, MyGap, MyHeader, MyIcon } from '../../components';
import CountDown from 'react-native-countdown-component';
import MyCarouser from '../../components/MyCarouser';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import Modal from "react-native-modal";
import { Toast, useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import DashedLine from 'react-native-dashed-line';
import RenderHtml from 'react-native-render-html';

export default function FlashSale({ navigation, route }) {
    const systemFonts = [fonts.body3.fontFamily, fonts.headline4.fontFamily];
    const toast = useToast();
    const isFocus = useIsFocused();
    const [user, setUser] = useState({});
    const [dataVoucher, setDataVoucher] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [pilih, setPilih] = useState({});


    const __getVouhcer = () => {

        axios.post(apiURL + 'voucher', {
            tipe: 'Flash Sale'
        }).then(res => {
            console.log(res.data);
            setDataVoucher(res.data)

        })

    }

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
    useEffect(() => {

        if (isFocus) {
            __getVouhcer();
            __GetUserProfile();
        }

    }, [isFocus]);
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900]
        }}>
            <MyHeader title="Flash Sale" />
            <MyCarouser />
            <View style={{
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={{
                    flex: 1,
                    ...fonts.headline4,
                    color: Color.blueGray[900]
                }}>Berakhir dalam</Text>
                <CountDown
                    until={1000 * 10 + 30}
                    size={15}
                    showSeparator
                    separatorStyle={{
                        marginHorizontal: 4,
                        color: Color.blueGray[400],

                    }}
                    onFinish={() => alert('Finished')}
                    digitStyle={{ backgroundColor: Color.red[500] }}
                    digitTxtStyle={{ color: Color.white[900] }}
                    timeToShow={['H', 'M', 'S']}
                    timeLabels={{ h: null, m: null, s: null }}
                />
            </View>
            <View style={{
                flex: 1,
                padding: 16
            }}>
                <FlatList data={dataVoucher} renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            setPilih(item);
                            setModalVisible(true);
                        }} style={{
                            backgroundColor: Color.white[900],

                            borderRadius: 12,
                            flexDirection: 'row',
                            overflow: 'hidden',
                            marginBottom: 12,
                        }}>
                            <Image style={{
                                height: '100%',
                                width: 45,
                            }} source={item.jenis == 'Discount' ? require('../../assets/dics.png') : require('../../assets/cash.png')} />
                            <View style={{
                                flex: 1,
                                padding: 12,
                                borderTopWidth: 1,
                                borderWidth: 1,
                                borderBottomWidth: 1,
                                borderColor: Color.blueGray[100],
                                borderTopRightRadius: 12,
                                borderBottomRightRadius: 12,
                            }}>
                                <Text style={{
                                    ...fonts.headline5,
                                    color: Color.blueGray[900],
                                }}>{item.nama_voucher}</Text>
                                <Text style={{
                                    ...fonts.body3,
                                    color: Color.blueGray[400],
                                    marginBottom: 8,
                                }}>{item.informasi}</Text>

                                <View style={{

                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 8,



                                }}>
                                    <MyIcon name='history-3' size={16} color={Color.blueGray[900]} />
                                    <Text style={{
                                        left: 8,
                                        flex: 1,
                                        ...fonts.caption1,
                                        color: Color.blueGray[900]
                                    }}>Berlaku sampai {moment(item.expired).format('DD MMMM YYYY')}</Text>
                                </View>

                                <DashedLine dashLength={8} dashThickness={1} dashGap={5} dashColor={Color.blueGray[200]} dashStyle={{ borderRadius: 2 }} />
                                <View style={{

                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 8,



                                }}>
                                    <Image source={require('../../assets/poin.png')} style={{
                                        width: 24,
                                        height: 24,
                                    }} />
                                    <Text style={{
                                        left: 8,
                                        flex: 1,
                                        ...fonts.headline5,
                                        color: Color.blueGray[900]
                                    }}>{item.poin} poin</Text>
                                    <Text style={{
                                        // flex: 1,
                                        ...fonts.body3,
                                        color: Color.blueGray[900]
                                    }}>Tersisa {item.jumlah} voucher</Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }} />
            </View>


            <Modal style={{
                margin: 0,
            }} isVisible={isModalVisible}
                backdropOpacity={0.5}
                animationIn="fadeIn"
                animationOut="fadeOut"
                onRequestClose={() => {

                    setModalVisible(!isModalVisible);
                }}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={{
                        height: windowHeight / 1.1,
                        backgroundColor: Color.white[900],
                        borderTopRightRadius: 32,
                        borderTopLeftRadius: 32,
                        paddingTop: 24,
                        paddingHorizontal: 18,
                        paddingBottom: 10,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                flex: 1,
                                ...fonts.headline4,
                                color: Color.blueGray[900],
                            }}>Detail Voucher</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Icon type='ionicon' size={24} name='close-circle' color={Color.blueGray[400]} />
                            </TouchableOpacity>

                        </View>

                        <View style={{
                            marginVertical: 20,
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                flex: 1,
                                ...fonts.body3,
                                color: Color.blueGray[900],
                            }}>Poin Saya Saat ini</Text>

                            <View style={{
                                height: 36,
                                borderRadius: 100,
                                paddingHorizontal: 12,
                                backgroundColor: Color.secondary[900],
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/poin.png')} style={{
                                    width: 28,
                                    height: 28,
                                }} />
                                <Text style={{
                                    marginLeft: 5,
                                    marginRight: 8,
                                    ...fonts.headline5,
                                    color: Color.white[900],
                                }}>{user.poin_saya} poin </Text>
                                <MyIcon name='round-alt-arrow-right' size={15} color={Color.white[900]} />
                            </View>
                        </View>


                        <View style={{
                            backgroundColor: Color.white[900],

                            borderRadius: 12,
                            flexDirection: 'row',
                            overflow: 'hidden',
                            marginBottom: 12,
                        }}>
                            <Image style={{
                                height: '100%',
                                width: 45,
                            }} source={pilih.jenis == 'Discount' ? require('../../assets/dics.png') : require('../../assets/cash.png')} />
                            <View style={{
                                flex: 1,
                                padding: 12,
                                borderTopWidth: 1,
                                borderWidth: 1,
                                borderBottomWidth: 1,
                                borderColor: Color.blueGray[100],
                                borderTopRightRadius: 12,
                                borderBottomRightRadius: 12,
                            }}>
                                <Text style={{
                                    ...fonts.headline5,
                                    color: Color.blueGray[900],
                                }}>{pilih.nama_voucher}</Text>
                                <Text style={{
                                    ...fonts.body3,
                                    color: Color.blueGray[400],
                                    marginBottom: 8,
                                }}>{pilih.informasi}</Text>

                                <View style={{

                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 8,



                                }}>
                                    <MyIcon name='history-3' size={16} color={Color.blueGray[900]} />
                                    <Text style={{
                                        left: 8,
                                        flex: 1,
                                        ...fonts.caption1,
                                        color: Color.blueGray[900]
                                    }}>Berlaku sampai {moment(pilih.expired).format('DD MMMM YYYY')}</Text>
                                </View>

                                <DashedLine dashLength={8} dashThickness={1} dashGap={5} dashColor={Color.blueGray[200]} dashStyle={{ borderRadius: 2 }} />
                                <View style={{

                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 8,



                                }}>
                                    <Image source={require('../../assets/poin.png')} style={{
                                        width: 24,
                                        height: 24,
                                    }} />
                                    <Text style={{
                                        left: 8,
                                        flex: 1,
                                        ...fonts.headline5,
                                        color: Color.blueGray[900]
                                    }}>{pilih.poin} poin</Text>
                                    <Text style={{
                                        // flex: 1,
                                        ...fonts.body3,
                                        color: Color.blueGray[900]
                                    }}>Tersisa {pilih.jumlah} voucher</Text>

                                </View>
                            </View>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={{
                                ...fonts.body3,
                            }}>Syarat & Ketentuan:</Text>
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
                                    html: pilih.syarat_ketentuan
                                }}
                            />
                        </ScrollView>

                        <MyGap jarak={20} />

                        <MyButton title="Klaim Voucher" onPress={() => {
                            console.log(pilih)
                            if (parseFloat(user.poin_saya) >= parseFloat(pilih.poin)) {
                                setModalVisible(false);
                                navigation.navigate('Unggah', {
                                    fid_user: user.id,
                                    fid_voucher: pilih.id,
                                    poin: pilih.poin,
                                })
                            } else {
                                setModalVisible(false);
                                toast.show('Maaf poin yang Kamu miliki tidak cukup. Silahkan kumpulkan poin terlebih dahulu.', {
                                    type: 'danger'
                                })
                            }

                        }} />

                        <MyGap jarak={8} />

                        <MyButton onPress={() => setModalVisible(false)} backgroundColor={Color.white} borderSize={2} textColor={Color.primary[900]} title="Tutup" />



                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})