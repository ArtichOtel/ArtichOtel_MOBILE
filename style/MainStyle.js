import { StyleSheet } from "react-native";
import colors from '../style/colors';


const mainStyle = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 'auto',
    height: '50%',
  },
  alignBtn: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    padding: 10,
    margin: 20,
    alignItems: "center",
  },
});

export default mainStyle;