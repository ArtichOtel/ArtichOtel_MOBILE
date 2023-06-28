import {useState} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import connectionStyle from "../style/ConnectionStyle";
import inputStyle from "../style/inputStyle";
import mainStyle from "../style/MainStyle";
import MainMenu from "../components/tabs/MainMenu";
import baseStyle from "../style/baseStyle";


type ConnectionProps = {
    navigation: any;
}


function ConnectionView(props: ConnectionProps): JSX.Element {
    const {navigation} = props
    const [username, setUsername] = useState<string>('')

    return (
        <View style={mainStyle.container}>
            <View style={[connectionStyle.container]}>

                <View style={inputStyle.labelWrapper}>
                    <Text style={[inputStyle.label]}>Identifiant</Text>
                    <Text style={[inputStyle.needed]}>*</Text>
                </View>

                <TextInput
                    style={[mainStyle.input, inputStyle.connectionView]}
                    autoComplete={"username"}
                    blurOnSubmit={true}
                    inputMode="text"
                    onChangeText={(val) => setUsername(val)}
                    placeholder={"identifiant"}
                />


                <View style={inputStyle.labelWrapper}>
                    <Text style={[inputStyle.label]}>Mot de passe</Text>
                    <Text style={[inputStyle.needed]}>*</Text>
                </View>

                <TextInput
                    style={[mainStyle.input, inputStyle.connectionView]}
                    autoComplete={"username"}
                    blurOnSubmit={true}
                    inputMode="text"
                    onChangeText={(val) => setUsername(val)}
                    placeholder={"mot de passe"}
                />

                <View style={[baseStyle.container, connectionStyle.buttonWrapper]}>

                    <TouchableOpacity >
                        <Text style={[inputStyle.label]}>Mot de passe</Text>
                    </TouchableOpacity>


                    <TouchableOpacity >
                        <Text style={[inputStyle.label]}>Mot de passe</Text>
                    </TouchableOpacity>



                </View>

            </View>

            <MainMenu navigation={navigation} />
        </View>
    )
}

export default ConnectionView;