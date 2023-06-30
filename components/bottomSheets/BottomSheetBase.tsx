import BottomSheetStyle from "../../style/BottomSheetStyle";
import { View } from "react-native";
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, Extrapolate } from 'react-native-reanimated'
import { SCREEN_HEIGHT } from "../../utils/dimension";
import React, { useCallback, useImperativeHandle } from "react";

type Props = {
  content: JSX.Element,
  height: number
}
export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void
  isActive: () => boolean
}
const BottomSheetBase = React.forwardRef<BottomSheetRefProps, Props>(({content, height}, ref) => {
  const translateY = useSharedValue(0)
  const context = useSharedValue({ y: 0 })
  const active = useSharedValue(false)
  const MAX_TRANSLATE_Y = -SCREEN_HEIGHT
  const MIN_TRANSLATE_Y = height

  const transYBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y+25, MAX_TRANSLATE_Y],
      [25, 0],
      Extrapolate.CLAMP
    )
    return {
      borderRadius,
      transform: [{ translateY: translateY.value }]
    }
  })

  const isActive = useCallback(() => {
    return active.value
  }, [])

  const scrollTo = useCallback((destination: number) => {
    'worklet'

    active.value = destination !== 0

    translateY.value = withSpring(destination, { damping: 50 })
  }, [])

  useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
    scrollTo,
    isActive
  ])

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y) // clamping w/ MAX_TRANSLATE_Y
    })
    .onEnd(() => { // closing the BottomSheet when MIN_TRANSLATE_Y
      if (translateY.value > MIN_TRANSLATE_Y) { 
        scrollTo(0)
      } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        scrollTo(MAX_TRANSLATE_Y)
      }
    })

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[BottomSheetStyle.container, transYBottomSheetStyle]}>
      <View style={BottomSheetStyle.line} />
      <View style={BottomSheetStyle.content}>
        {content}
      </View>
      </Animated.View>
    </GestureDetector>
  )
})

export default BottomSheetBase