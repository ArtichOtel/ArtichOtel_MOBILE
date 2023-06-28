import { StyleSheet } from "react-native";
import colors from "./colors";

const typoTitle = 'Bitter-Regular';
const typoText = 'Nunito Sans';

const baseStyle = StyleSheet.create({
  container: { 
  },
  title: {
    fontFamily: typoTitle,
  },
  text: {
    fontFamily: typoText,
  },

})

export default baseStyle;