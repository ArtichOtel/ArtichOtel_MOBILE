import { StyleSheet } from "react-native";
import colors from '../style/colors';


const RoomTypesBottomSheetStyle = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  alignContent: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
    gap: 20,
    alignContent: "center",
  },
  checkbox: {
    margin: 8,
    width: 40,
    height: 40,
  },
  textTitle: {
    textAlign: "center",
    fontSize: 20,
    margin: 20,
  },
});

export default RoomTypesBottomSheetStyle;