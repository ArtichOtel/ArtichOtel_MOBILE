import { StyleSheet } from "react-native";
import colors from "./colors";
import { withTiming } from "react-native-reanimated";


const presentChamberStyle = StyleSheet.create({

    greatContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },

    middleContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginRight: 10
    },

    littleContainer: {
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15
    },

    arrivalHourContainer: {
      flexDirection: "row", 
      alignItems: "center",
      justifyContent: "center",
      marginTop: 15
  },

    infoBox: {
      flexDirection: "row",
      flex: 0,
      borderColor: colors.tertiary,
      borderWidth: 1,
      borderRadius: 10,
      shadowColor: '#000',
      width: 300,
      height: 30,
      marginBottom: 5,
      marginTop: 15,
      justifyContent:"center"
    },

    buttonPrice: {
      backgroundColor: colors.tertiary,
      marginLeft: 25,
      marginBottom: 15,
      borderRadius: 5,
      height: 40,
      width: 110,
      alignItems: "center",
      justifyContent: "center",
    },

    buttonValid: {
      backgroundColor: colors.tertiary,
      marginRight: 15,
      marginLeft: 15,
      marginBottom: 15,
      borderRadius: 5,
      height: 40,
      width: 220,
      alignItems: "center",
      justifyContent: "center",
    },

    buttonTextColor: {
      color: colors.primary,
    }
  });


  export default presentChamberStyle;