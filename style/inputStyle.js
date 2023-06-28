import { StyleSheet } from "react-native";
import colors from "./colors";


const inputStyle = StyleSheet.create({
    connectionView: {
        backgroundColor: colors.secondary,
        color: colors.quaternary,
        borderWidth: 1,
        borderColor: colors.grey,
        width: '100%'
    },
    labelWrapper: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    label: {
        fontWeight: "900",
        fontSize: 14
    },
    needed: {
        marginLeft: 4,
        color: 'red'
    }
    
});

export default inputStyle;