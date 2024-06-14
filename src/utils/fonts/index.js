import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const DimensionThisPhone = windowHeight * windowWidth / 1000;

export const fonts = {

  headline0: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 40,
    lineHeight: 60
  },

  headline1: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    lineHeight: 44
  },

  headline2: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 22,
    lineHeight: 41
  },


  headline3: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    lineHeight: 34
  },


  headline4: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    lineHeight: 30
  },


  headline5: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    lineHeight: 26
  },


  subheadline3: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    lineHeight: 26
  },


  body2: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 18,
    lineHeight: 34
  },

  body3: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    lineHeight: 26
  },

  caption1: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
    lineHeight: 26
  },

  primary: {
    300: 'Poppins-Light',
    400: 'Poppins-Regular',
    600: 'Poppins-SemiBold',
    700: 'Poppins-Bold',
    800: 'Poppins-ExtraBold',
    900: 'Poppins-Black',
    normal: 'HammersmithOne-Regular',
  },
  secondary: {
    200: 'Montserrat-ExtraLight',
    300: 'Montserrat-Light',
    400: 'Montserrat-Regular',
    600: 'Montserrat-Medium',
    700: 'Montserrat-Bold',
    800: 'Montserrat-ExtraBold',
    900: 'Roboto-Black',
    normal: 'Fonetis',
  },
};
