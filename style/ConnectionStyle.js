import { StyleSheet } from "react-native";
import colors from "./colors";


const connectionStyle = StyleSheet.create({
    container: {
        flex: 1,
        //display: 'flex',
        alignItems: "center",
        justifyContent: "center",
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
    first: {
        marginTop: 80
    },
    buttonWrapper: {
        paddingTop: 50,
        width: '100%',
    },
    button: {
        paddingLeft: 30,
        paddingRight: 30
    }
});

export default connectionStyle;