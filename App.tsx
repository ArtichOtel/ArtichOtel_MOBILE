import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MainView from "./views/MainView";
import ConnectionView from "./views/ConnectionView";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Main" component={MainView} options={{title:"Hotel l'Artichaut"}} />
              <Stack.Screen name="Connection" component={ConnectionView} />
          </Stack.Navigator>
      </NavigationContainer>
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
