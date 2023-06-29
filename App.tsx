import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import PresentChamberView from './views/PresentChamberView';
import MainView from "./views/MainView";
import ConnectionView from "./views/ConnectionView";
import colors from "./style/colors";


import baseStyle from './style/baseStyle';
import mainStyle from './style/MainStyle';

const image = require('./assets/images/chambreHotel.jpg');
const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <View style={styles.container}>
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
