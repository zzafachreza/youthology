import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Color, DimensionThisPhone, MyDimensi, colors, fonts, windowWidth } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { getData } from '../../utils/localStorage';
import MyIcon from '../MyIcon';
export default function MyHeader({ onPress, color = Color.primary[900], title }) {


  const navigation = useNavigation();

  return (


    <View style={{
      marginTop: 16,
      marginHorizontal: 18,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
    }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{

      }}>
        <MyIcon name='arrow-left-outline' size={24} color={color} />
      </TouchableOpacity>

      <Text style={{
        ...fonts.headline4,
        flex: 1,
        left: 24,

        color: colors.white
      }}>{title}</Text>
    </View>

  );
}

const styles = StyleSheet.create({});
