import { StyleSheet } from "react-native";
import colors from "./colors";

const buttonStyle = StyleSheet.create({
  dark: {
    backgroundColor: colors.primary,
    color: colors.secondary,
    // TODO : add shadow
  },
  light: {
    backgroundColor: colors.secondary,
    color: colors.quaternary,
  }
});

export default buttonStyle;