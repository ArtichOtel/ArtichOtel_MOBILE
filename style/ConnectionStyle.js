import { StyleSheet } from "react-native";
import colors from "./colors";


const connectionStyle = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 80,
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%'
    },
    input: {
        backgroundColor: colors.secondary,
        color: colors.quaternary,
        borderWidth: 1,
        borderColor: colors.grey,
        width: '100%'
    },
    buttonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    button: {
        paddingLeft: 30,
        paddingRight: 30
    }
});

export default connectionStyle;