import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Register,
  Login,
  Home,
  GetStarted,
  OnBoarding,
  RegisterSuccess,
  Treatment,
  CSAdmin,
  Account,
  CSAdminTanggal,
  CSAdminKonfirmasi,
  CSAdminSuccess,
  CSAdminJadwal
} from '../pages';
import { colors } from '../utils';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomNavigator from '../components/BottomNavigator';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {


  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Treatment" component={Treatment} />
      <Tab.Screen name="CSAdmin" component={CSAdmin} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};


export default function Router() {
  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="RegisterSuccess"
        component={RegisterSuccess}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="CSAdminJadwal"
        component={CSAdminJadwal}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CSAdminKonfirmasi"
        component={CSAdminKonfirmasi}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CSAdminSuccess"
        component={CSAdminSuccess}
        options={{
          headerShown: false,
        }}
      />




    </Stack.Navigator>
  );
}
