import { StyleSheet } from "react-native";
import colors from "./colors";


const mainMenuStyle = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: 62,
        width: '100%',
        bottom: 0,
        /*TODO : change 'bottom' to 'top' with calculated
           value from user screen minus mainMenu height
           OR make this container hidden when user keyboard is On
        */
        backgroundColor: colors.primary,
        position: 'absolute',
    },
    items: {
        color: colors.secondary
    }
    
});

export default mainMenuStyle;