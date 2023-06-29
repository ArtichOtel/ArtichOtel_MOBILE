import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import PresentChamberView from './views/PresentChamberView';
import MainView from "./views/MainView";
import ConnectionView from "./views/ConnectionView";


import colors from "./style/colors";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Stack = createNativeStackNavigator();


export default function App(): JSX.Element {
  return (

    <View style={styles.container}>
      {/* <NavigationContainer>
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
      </NavigationContainer> */}

      

      <PresentChamberView />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});