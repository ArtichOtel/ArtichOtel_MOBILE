import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheetBase, { BottomSheetRefProps } from './components/BottomSheetBase';
import { SCREEN_HEIGHT } from './utils/dimension';

const ModalContent = () => {
  return (
    <Text>Bonjour</Text>
  )
}

export default function App() {
  const ref = useRef<BottomSheetRefProps>(null)
  const onPress = useCallback((height) => {
    ref?.current?.scrollTo(height)
  }, [])
  const BottomSheetBaseHeight = -SCREEN_HEIGHT / 3

  return (
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={styles.container}>
          <StatusBar style='light' />
          <TouchableOpacity style={styles.button} onPress={() => onPress(BottomSheetBaseHeight)}/>
          <BottomSheetBase
            ref={ref}
            content={<ModalContent/>}
            height={BottomSheetBaseHeight}
          />
        </View>
      </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: 'white',
    opacity: 0.3
  }
});
