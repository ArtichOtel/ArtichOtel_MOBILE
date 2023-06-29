import { StyleSheet } from "react-native";
import colors from '../style/colors';


const mainStyle = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  alignBtn: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    padding: 10,
    margin: 20,
    justifyContent: "flex-start",
  },
  first: {
    marginTop: 60,
  },

  alignBtn: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    padding: 10,
    margin: 20,
    alignItems: "center",
  },

  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 10
  }
});

export default mainStyle;