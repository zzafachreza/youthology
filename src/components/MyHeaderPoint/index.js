import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import MyIcon from '../MyIcon'
import { Color, fonts } from '../../utils'

export default function MyHeaderPoint({ title = 'CS Admin', level }) {
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
                <TouchableOpacity>
                    <Image source={require('../../assets/badgeSilver.png')} style={{
                        width: 100,
                        resizeMode: 'contain',
                        height: 35
                    }} />
                </TouchableOpacity>
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
        </View>
    )
}

const styles = StyleSheet.create({})