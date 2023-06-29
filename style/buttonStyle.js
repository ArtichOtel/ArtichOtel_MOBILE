import { StyleSheet } from "react-native";
import colors from "./colors";

const buttonStyle = StyleSheet.create({
  dark: {
    backgroundColor: colors.primary,
  },
  light: {
    backgroundColor: colors.secondary,
  },
  search: {
    backgroundColor: colors.primary,
    color: colors.secondary,
  },
});

export default buttonStyle;