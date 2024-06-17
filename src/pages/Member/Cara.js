import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import { apiURL, getData } from '../../utils/localStorage';
import { MyGap, MyHeader, MyHeaderPoint, MyIcon } from '../../components';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import { useIsFocused } from '@react-navigation/native';

export default function Cara({ navigation, route }) {
    const [pilih, setPilih] = useState(0);

    const [loading, setLoading] = useState(false);
    const isFocus = useIsFocused();
    const [data, setData] = useState([]);
    const [tmp, setTmp] = useState([]);

    useEffect(() => {
        if (isFocus) {
            __getKlaim();
        }
    }, [isFocus]);
    const __getKlaim = () => {

        axios.post(apiURL + 'cara').then(res => {
            console.log('jadwal', res.data);
            setData(res.data);

        })

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900]
        }}>
            <StatusBar backgroundColor={Color.white[900]} barStyle="dark-content" />
            <MyHeader title="Detail" />


            {/* SUB HALAMAN TREATMENT */}
            {/* TREATMENT */}
            {!loading &&

                <View style={{
                    padding: 16
                }}>
                    <Text style={{
                        ...fonts.headline4,
                        color: Color.blueGray[900],
                        marginBottom: 12,
                    }}>Bagaimana cara saya mendapatkan poin?</Text>
                    <FlatList data={data} renderItem={(({ item, index }) => {
                        return (

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderWidth: 1,
                                padding: 12,
                                marginVertical: 8,
                                borderRadius: 12,
                                borderColor: Color.blueGray[100]
                            }}>
                                <Text style={{
                                    marginRight: 10,
                                    ...fonts.headline3,
                                }}>{index + 1}</Text>
                                <Text style={{
                                    flex: 1,
                                }}>{item.langkah}</Text>
                            </View>
                        )
                    })} />

                </View>


            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})