import { StyleSheet } from "react-native";
import colors from "./colors";
import {SCREEN_HEIGHT} from "../utils/dimension"

const mainMenuStyle = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: '100%',
        /*TODO : find a way to determinate the actual '56' value
           OR make it better
        */
        bottom: 0,
        backgroundColor: colors.primary,
        position: 'absolute',
    },
    containerHeightAndroid: {
        height: 62,
    },
    containerHeightIOS: {
        height: 80,
    },
    items: {
        color: colors.secondary
    }

});

export default mainMenuStyle;