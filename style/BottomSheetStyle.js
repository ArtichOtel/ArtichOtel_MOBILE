import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT } from "../utils/dimension";


const BottomSheetStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: SCREEN_HEIGHT,
    position: "absolute",
    top: SCREEN_HEIGHT,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: 9000
  },

  content: {
    paddingHorizontal: 20
  },

  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 25
  }
})

export default BottomSheetStyle