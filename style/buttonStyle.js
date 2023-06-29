import { StyleSheet } from "react-native";
import colors from "./colors";

const buttonStyle = StyleSheet.create({
  dark: {
    backgroundColor: colors.primary,
  },
  textDark: {
    fontSize: 18,
    color: colors.secondary,
  },
  light: {
    backgroundColor: colors.secondary,
  },
  textLight: {
    fontSize: 18,
    color: colors.quaternary,
  },
  search: {
    backgroundColor: colors.primary,
    color: colors.secondary,
  },
});

export default buttonStyle;