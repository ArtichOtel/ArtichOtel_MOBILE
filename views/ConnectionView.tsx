import {useState} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import connectionStyle from "../style/ConnectionStyle";
import inputStyle from "../style/inputStyle";
import MainMenu from "../components/tabs/MainMenu";
import baseStyle from "../style/baseStyle";
import buttonStyle from "../style/buttonStyle";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowRightToBracket, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import mainMenuStyle from "../style/mainMenuStyle";


type ConnectionProps = {
    navigation: any;
}


function ConnectionView(props: ConnectionProps): JSX.Element {
    const {navigation} = props
    const [username, setUsername] = useState<string>('')

    return (
        <View style={baseStyle.view}>
            <View style={[connectionStyle.container]}>

                <View style={inputStyle.labelWrapper}>
                    <Text style={[inputStyle.label]}>Identifiant</Text>
                    <Text style={[inputStyle.needed]}>*</Text>
                </View>

                <TextInput
                    style={[baseStyle.input, connectionStyle.input]}
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
                    style={[baseStyle.input, connectionStyle.input]}
                    autoComplete={"username"}
                    blurOnSubmit={true}
                    inputMode="text"
                    onChangeText={(val) => setUsername(val)}
                    placeholder={"mot de passe"}
                />

                <View style={[baseStyle.container, connectionStyle.buttonWrapper]}>

                    <TouchableOpacity style={[baseStyle.btn, buttonStyle.dark]}>
                        <FontAwesomeIcon icon={faArrowRightToBracket} size={30} style={mainMenuStyle.items} />
                        <Text style={[connectionStyle.button, buttonStyle.textDark]}>Se connecter</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={[baseStyle.btn, buttonStyle.dark]}>
                        <FontAwesomeIcon icon={faUserPlus} size={30} style={mainMenuStyle.items} />
                        <Text style={[connectionStyle.button, buttonStyle.textDark]}>Créer un compte</Text>
                    </TouchableOpacity>


                </View>

            </View>

            <MainMenu navigation={navigation} />
        </View>
    )
}

export default ConnectionView;