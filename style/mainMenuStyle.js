import { StyleSheet } from "react-native";
import colors from "./colors";


const mainMenuStyle = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: 62,
        width: '100%',
        bottom:0,
        backgroundColor: colors.primary,
        position: 'absolute',
    },
    items: {
        color: colors.secondary
    }
    
});

export default mainMenuStyle;