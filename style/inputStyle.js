import { StyleSheet } from "react-native";
import colors from "./colors";


const inputStyle = StyleSheet.create({
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