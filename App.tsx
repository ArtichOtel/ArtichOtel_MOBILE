import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

import MainView from "./views/MainView";
import ConnectionView from "./views/ConnectionView";
import PresentChamberView from './views/PresentChamberView';
import colors from "./style/colors";
import { useEffect, useState } from 'react';
import axios from 'axios';

import baseStyle from './style/baseStyle';
import mainStyle from './style/MainStyle';

const image = require('./assets/images/chambreHotel.jpg');
const Stack = createNativeStackNavigator();


export default function App(): JSX.Element {
  return (

    <View>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainView}
            options={{
              title: null,
              headerStyle: { backgroundColor: colors.primary }
            }} />
          <Stack.Screen name="Connection" component={ConnectionView}
            options={{
              title: null,
              headerStyle: { backgroundColor: colors.primary }
            }} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* <PresentChamberView /> Pour la présentation de la chambre*/}
    </View>
  );
}

