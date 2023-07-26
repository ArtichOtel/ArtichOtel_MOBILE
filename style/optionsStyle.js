import { StyleSheet } from "react-native";
import colors from "./colors";
import { withTiming } from "react-native-reanimated";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";


const presentChamberStyle = StyleSheet.create({
    centerContainer: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },

    titleBox: {
        display: "flex",
        backgroundColor: colors.secondary,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: 350,
        height: 50,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: colors.primary,
        borderStyle: "solid",

        marginBottom: 5,
        marginTop: 5,
    },

    recapInfoContainer: {
        alignItems: "center",
        justifyContent: "center",
    },

    //Un truc pour chaque partie de récap info

    line: {
        borderBottomColor:colors.primary,
        borderBottomWidth: 1,
        alignSelf: "stretch",
        marginBottom:15,
        marginTop: 15,
    },

    contentOptionCenter: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
    },




    textContainer: {
        alignItems: "flex-start",
        justifyContent: "center",
    },

    switchContainer: {
        alignItems: "center",
        justifyContent: "center",
    },

    cbContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    buttonBackgroundContainer: {
        backgroundColor: colors.primary,
        width: "100%",
        height: 100,
        flexDirection: "row",
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: colors.primary,
    },

    contentCenter: {
      alignItems: "center",
        gap: 5,
    },

    buttonPrice: {
        justifyContent: "center",
        backgroundColor: colors.tertiary,
        marginLeft: 25,
        marginBottom: 15,
        borderRadius: 5,
        height: 40,
        width: 110,

    },

    buttonPriceAndroid: {
        justifyContent: "center",
        backgroundColor: colors.tertiary,
        marginLeft: 8,
        marginBottom: 15,
        borderRadius: 5,
        height: 40,
        width: 110,
    },

    buttonValid: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.tertiary,
        marginRight: 15,
        marginLeft: 10,
        marginBottom: 15,
        borderRadius: 5,
        height: 40,
        width: 220,
    },

    buttonTextColor: {
        color: colors.primary,
        fontWeight: "bold",
    },
  });


  export default presentChamberStyle;