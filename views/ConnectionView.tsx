import {useState} from "react";
import {TextInput, View} from "react-native";
import connectionStyle from "../style/ConnectionStyle";
import inputStyle from "../style/inputStyle";
import mainStyle from "../style/MainStyle";


type ConnectionProps = {
    placeholder: string;
}


function ConnectionView(props: ConnectionProps): JSX.Element {
    const {placeholder} = props
    const [username, setUsername] = useState<string>('')

    return (
        <View style={connectionStyle.container}>

            <TextInput
                style={[mainStyle.input, inputStyle.connectionView]}
                autoComplete={"username"}
                blurOnSubmit={true}
                inputMode="text"
                onChangeText={(val) => setUsername(val)}
                placeholder={"identifiant"}
            />
        </View>
    )
}

export default ConnectionView;