import { StyleSheet } from "react-native";
import colors from "./colors";
import { withTiming } from "react-native-reanimated";


const presentChamberStyle = StyleSheet.create({
    containerPrincipal: {
      flex: 1,
      backgroundColor:'white',
      alignItems:'center',
      justifyContent:'center',
    },
    
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

    arrivalHourContainer: {
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
      shadowColor: '#000',
      width: 300,
      marginBottom: 25,
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