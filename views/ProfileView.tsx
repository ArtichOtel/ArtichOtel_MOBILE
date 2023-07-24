import React, {useContext, useState} from "react";
import {Animated, Text, TextInput, TouchableOpacity, View} from "react-native";
import connectionStyle from "../style/ConnectionStyle";
import inputStyle from "../style/inputStyle";
import MainMenu from "../components/tabs/MainMenu";
import baseStyle from "../style/baseStyle";
import buttonStyle from "../style/buttonStyle";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { faFloppyDisk, faUserSlash, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import mainMenuStyle from "../style/mainMenuStyle";
import axios from "axios";
// @ts-ignore
import {API_URL} from "@env";
//import {userDataType, userProfileType} from "../utils/types";
import {UserCtx, UserProfileCtx} from "../utils/context";
import ScrollView = Animated.ScrollView;
import SignUpViewStyle from "../style/SignUpViewStyle";
import {defaultProfile, defaultUserData} from "../App";


type ConnectionProps = {
    navigation: any;
}


function ConnectionView(props: ConnectionProps): JSX.Element|null {
    const {navigation} = props
    const {currentUser, setCurrentUser} = useContext(UserCtx)
    const {userProfile, setUserProfile} = useContext(UserProfileCtx)
    const [lastname, setLastname] = useState<string>('')
    const [firstname, setFirstname] = useState<string>('')
    const [pseudo, setPseudo] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [connectionError, setConnectionError] = useState<string|null>(null)

    console.log("ProfilView, userProfile :",userProfile)
    console.log("ProfilView, currentUser :",currentUser)

    function loggout() {
        axios.get(API_URL+"user/logout", {
            headers: {
                'Authorization': `Bearer ${currentUser.token}`
            }
        }).then(()=>{
            console.log("DISCONNECTED !")
            setUserProfile(defaultProfile)
            setCurrentUser(defaultUserData)
        }).then(() => navigation.navigate('Main'))
    }


    return (
        !currentUser ? null :
            <View style={baseStyle.view}>
                <ScrollView
                    style={[SignUpViewStyle.container]}
                >
                    <View style={connectionStyle.container}>

                        <View style={{marginTop: 30, marginBottom: 30}}>
                            <TouchableOpacity style={[baseStyle.btn, buttonStyle.dark]}
                                onPress={() => loggout()}
                            >
                                <FontAwesomeIcon icon={faArrowRightFromBracket} size={30} style={mainMenuStyle.items} />
                                <Text style={[baseStyle.textTypo, baseStyle.textLight, connectionStyle.button]}>Déconnexion</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[inputStyle.labelWrapper]}>
                            <Text style={[inputStyle.label]}>Nom</Text>
                            <Text style={[inputStyle.needed]}>*</Text>
                        </View>

                        <TextInput
                            style={[baseStyle.input, connectionStyle.input]}
                            autoComplete={"name-family"}
                            blurOnSubmit={true}
                            inputMode="text"
                            onChangeText={(val) => setLastname(val)}
                            onPressIn={() => setConnectionError(null)}
                            placeholder={userProfile.lastName || "votre nom"}
                            value={lastname}
                        />

                        <View style={inputStyle.labelWrapper}>
                            <Text style={[inputStyle.label]}>Prénom</Text>
                            <Text style={[inputStyle.needed]}>*</Text>
                        </View>

                        <TextInput
                            style={[baseStyle.input, connectionStyle.input]}
                            autoComplete={"name"}
                            blurOnSubmit={true}
                            inputMode="text"
                            onChangeText={(val) => setFirstname(val)}
                            onPressIn={() => setConnectionError(null)}
                            placeholder={userProfile.firstName || "votre prénom"}
                            value={firstname}
                        />

                        <View style={inputStyle.labelWrapper}>
                            <Text style={[inputStyle.label]}>Pseudo</Text>
                        </View>

                        <TextInput
                            style={[baseStyle.input, connectionStyle.input]}
                            autoComplete={"username"}
                            blurOnSubmit={true}
                            inputMode="text"
                            onChangeText={(val) => setPseudo(val)}
                            onPressIn={() => setConnectionError(null)}
                            placeholder={userProfile.pseudo}
                            value={pseudo}
                        />

                        <View style={inputStyle.labelWrapper}>
                            <Text style={[inputStyle.label]}>Email</Text>
                            <Text style={[inputStyle.needed]}>*</Text>
                        </View>

                        <TextInput
                            style={[baseStyle.input, connectionStyle.input]}
                            autoComplete={"email"}
                            blurOnSubmit={true}
                            inputMode="text"
                            onChangeText={(val) => setEmail(val)}
                            onPressIn={() => setConnectionError(null)}
                            placeholder={userProfile.email}
                            value={email}
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

                        <View style={[connectionStyle.buttonWrapper]}>
                            <TouchableOpacity style={[baseStyle.btn, buttonStyle.dark]}
                                              //onPress={() => trySignUp()}
                            >
                                <FontAwesomeIcon icon={faFloppyDisk} size={30} style={mainMenuStyle.items} />
                                <Text style={[baseStyle.textTypo, baseStyle.textLight, connectionStyle.button]}>Enregistrer</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[baseStyle.btn, baseStyle.errorText]}
                                              //onPress={() => trySignUp()}
                            >
                                <FontAwesomeIcon icon={faUserSlash} size={30} style={baseStyle.btn} />
                                <Text >Supprimer le compte</Text>
                            </TouchableOpacity>

                        </View>
                    </View>


                </ScrollView>

                <MainMenu navigation={navigation}  />
            </View>
    )
}

export default ConnectionView;