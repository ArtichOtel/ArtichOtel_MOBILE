import { StyleSheet } from "react-native";
import colors from "./colors";
import { withTiming } from "react-native-reanimated";


const presentChamberStyle = StyleSheet.create({

    contentCenter: {
      alignItems: "center",
      justifyContent: "center",
    },

    advantagesContainer: {
      flexDirection: "row",
    },

    columnContainer: {

        marginTop: 15,
        marginRight: 10
    },

    itemContainer: {
        flexDirection: "row", 
        marginTop: 15
    },

    arrivalHourContainer: {
      flexDirection: "row", 

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