import { StyleSheet } from "react-native";
import colors from "./colors";

const typoTitle = 'Bitter-Regular';
const typoText = 'Nunito Sans';

const baseStyle = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.3)'
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
  textTypo: {
    //fontFamily: typoText,
    fontSize: 18
  },
  textDark: {
    color: colors.quaternary,
  },
  textLight: {
    color: colors.secondary,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    padding: 5,
    backgroundColor: '#ff000060'
}

})

export default baseStyle;