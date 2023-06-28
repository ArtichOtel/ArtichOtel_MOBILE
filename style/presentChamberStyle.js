import { StyleSheet } from "react-native";

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
    },

    littleContainer: {
        display: "flex",
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15
    }
  });


  export default presentChamberStyle;