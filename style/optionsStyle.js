import { StyleSheet } from "react-native";
import colors from "./colors";
import { withTiming } from "react-native-reanimated";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";


const presentChamberStyle = StyleSheet.create({

    contentCenter: {
      alignItems: "center",
      justifyContent: "center",
    },


    contentOptionCenter: {
        alignItems: "flex-start",
        justifyContent: "center",
    },

    recapInfoContainer: {
        alignItems: "center",
        justifyContent: "center",
    },


    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    cbContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    titleBox: {
      flexDirection: "row",
      flex: 0,
      borderColor: colors.tertiary,
      borderWidth: 1,
      borderRadius: 10,
      shadowColor: '#000',
      width: 300,
      height: 30,
      marginBottom: 5,
      marginTop: 5,
    },

    buttonPrice: {
      backgroundColor: colors.tertiary,
      marginLeft: 25,
      marginBottom: 15,
      borderRadius: 5,
      height: 40,
      width: 110,

    },

    buttonValid: {
      backgroundColor: colors.tertiary,
      marginRight: 15,
      marginLeft: 15,
      marginBottom: 15,
      borderRadius: 5,
      height: 40,
      width: 220,
    },

    buttonTextColor: {
      color: colors.primary,
    },

    buttonBackgroundContainer: 
    {
      backgroundColor: colors.primary,
      flexDirection: "row",
    }
  });


  export default presentChamberStyle;