import {useState} from "react";
import {TextInput, View} from "react-native";
import connectionStyle from "../style/ConnectionStyle";
import inputStyle from "../style/inputStyle";
import mainStyle from "../style/MainStyle";
import MainMenu from "../components/tabs/MainMenu";


type ConnectionProps = {
    navigation: any;
}


function ConnectionView(props: ConnectionProps): JSX.Element {
    const {navigation} = props
    const [username, setUsername] = useState<string>('')

    return (
        <View style={[mainStyle.container, connectionStyle.container]}>

            <TextInput
                style={[mainStyle.input, inputStyle.connectionView]}
                autoComplete={"username"}
                blurOnSubmit={true}
                inputMode="text"
                onChangeText={(val) => setUsername(val)}
                placeholder={"identifiant"}
            />

            <MainMenu navigation={navigation} />
        </View>
    )
}

export default ConnectionView;