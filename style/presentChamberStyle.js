import { StyleSheet } from "react-native";
import colors from "./colors";


const presentChamberStyle = StyleSheet.create({
    greatContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },

    middleContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginRight: 15
    },

    littleContainer: {
        display: "flex",
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15
    },

    box: {
      display: "flex",
      flexDirection: "row",
      borderColor: colors.tertiary,
      borderWidth: 1,
      borderRadius: 10,
      shadowColor: '#FFF',
      width: 300,
      marginBottom: 100,
      marginTop: 100,
    },

    testButton: {
      backgroundColor: colors.tertiary,
      color: colors.primary,
      marginRight: 15,
      marginLeft: 15,
      borderRadius: 5,
    }
  });


  export default presentChamberStyle;