import { StyleSheet } from "react-native";
import colors from "./colors";

const typoTitle = 'Bitter-Regular';
const typoText = 'Nunito Sans';

const baseStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontFamily: typoTitle,
  },
  text: {
    //fontFamily: typoText,
  },
  btn: {
    borderRadius: 10,
    fontSize: 20,
  },
})

export default baseStyle;