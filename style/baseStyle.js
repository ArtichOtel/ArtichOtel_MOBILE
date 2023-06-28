import { StyleSheet } from "react-native";
import colors from "./colors";

const typoTitle = 'Bitter-Regular';
const typoText = 'Nunito Sans';

const baseStyle = StyleSheet.create({
  view: {
    flex: 1,
    paddingBottom: 62 // = tab height
  },
  container: {
    flex: 1
  },
  title: {
    fontFamily: typoTitle,
  },
  btn: {
    height: 50,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    // TODO : add shadow
  },
  input: {
    height: 50,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  text: {
    //fontFamily: typoText,
    fontSize: 18
  }
})

export default baseStyle;