import { StyleSheet } from "react-native";
import colors from "./colors";

const NumberOfPeopleBottomSheetStyle = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  alignContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: "100%",
    height: "50%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.tertiary,
  },
  textTitle: {
    textAlign: "center",
    fontSize: 20,
    margin: 20, 
  },
  textBold: {
    fontWeight: "bold",
  }

});

export default NumberOfPeopleBottomSheetStyle;