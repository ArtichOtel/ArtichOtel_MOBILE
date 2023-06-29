import React, {useContext, useState} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import connectionStyle from "../style/ConnectionStyle";
import inputStyle from "../style/inputStyle";
import MainMenu from "../components/tabs/MainMenu";
import baseStyle from "../style/baseStyle";
import buttonStyle from "../style/buttonStyle";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowRightToBracket, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import mainMenuStyle from "../style/mainMenuStyle";
import axios from "axios";
// @ts-ignore
import {API_URL} from "@env";
import {userDataType} from "../utils/types";
import {UserContext} from "../App";


type ConnectionProps = {
    navigation: any;
}


function ConnectionView(props: ConnectionProps): JSX.Element {
    const {navigation} = props
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [connectionError, setConnectionError] = useState<string|null>(null)

    const getUserAccess = async () => {
        return await axios
            .post(API_URL+"user/login", {
                pseudo: username,
                email: username,
                password: password
            })
            .then((response) => {
                console.log("RESPONSE",response.data)

                return response.data;
            })
            .then((userData) => {
                console.log("recap")
                console.log(userData.user_id,userData.token,userData.customer_id)
                setCurrentUser({
                    userId: userData.user_id,
                    token: userData.token,
                    customerId: userData.customer_id
                })
                setPassword("");
                setUsername("");
            })
            .catch((err) => {
                console.log("connection error :", err);
                setConnectionError(err.response.data.message)
            });
    };

    function tryConnection():void {
getUserAccess().then()
    }


    return (
        <View style={baseStyle.view}>
            <View style={[connectionStyle.container]}
            >

                {connectionError ?
                    <View style={{marginBottom: 20}}>
                        <Text style={baseStyle.errorText}>{connectionError}</Text>
                    </View>
                    : null}


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
                    onPressIn={() => setConnectionError(null)}
                    placeholder={"identifiant"}
                    value={username}
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
                    secureTextEntry={true}
                    onChangeText={(val) => setPassword(val)}
                    onPressIn={() => setConnectionError(null)}
                    placeholder={"mot de passe"}
                    value={password}
                />

                <View style={[connectionStyle.buttonWrapper]}
                >

                    <TouchableOpacity style={[baseStyle.btn, buttonStyle.dark]}
                    onPress={() => tryConnection()}
                    >
                        <FontAwesomeIcon icon={faArrowRightToBracket} size={30} style={mainMenuStyle.items} />
                        <Text style={[baseStyle.textTypo, baseStyle.textLight, connectionStyle.button]}>Se connecter</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={[baseStyle.btn, buttonStyle.dark]} >
                        <FontAwesomeIcon icon={faUserPlus} size={30} style={mainMenuStyle.items} />
                        <Text style={[baseStyle.textTypo, baseStyle.textLight, connectionStyle.button]}>Créer un compte</Text>
                    </TouchableOpacity>


                </View>

            </View>

            <MainMenu navigation={navigation}  />
        </View>
    )
}

export default ConnectionView;