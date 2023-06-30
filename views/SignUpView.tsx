import React, {useContext, useState} from "react";
import {Animated, Text, TextInput, TouchableOpacity, View} from "react-native";
import connectionStyle from "../style/ConnectionStyle";
import inputStyle from "../style/inputStyle";
import MainMenu from "../components/tabs/MainMenu";
import baseStyle from "../style/baseStyle";
import buttonStyle from "../style/buttonStyle";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { faUserPlus} from "@fortawesome/free-solid-svg-icons";
import mainMenuStyle from "../style/mainMenuStyle";
import axios from "axios";
// @ts-ignore
import {API_URL} from "@env";
import {userDataType} from "../utils/types";
import {UserContext} from "../App";
import ScrollView = Animated.ScrollView;
import SignUpViewStyle from "../style/SignUpViewStyle";
import {getProfileData, updateUserProfile} from "../utils/profileUpdater";


type ConnectionProps = {
    navigation: any;
}


function ConnectionView(props: ConnectionProps): JSX.Element {
    const {navigation} = props
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const [lastname, setLastname] = useState<string>('')
    const [firstname, setFirstname] = useState<string>('')
    const [pseudo, setPseudo] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [connectionError, setConnectionError] = useState<string|null>(null)


    const postCreateUser = () => {
        let bodyJSON = {
            last_name: lastname,
            first_name: firstname,
            pseudo: pseudo,
            email: email,
            password: password,
            lang: 'fr_FR'
    }
        return axios
            .post(API_URL+"user/register",
                bodyJSON)
            .then((response) => {
                console.log("RESPONSE",response.data)
                alert(`Bienvenue ${response.data[0].pseudo} !`)
                return response.data;
            })
            .catch((err) => {
                console.log("connection error :", err);
                setConnectionError(err.response.data.message)
            });
    };


    function autoLogin(pseudo:string) {
        return axios.post(API_URL+"user/login", {
            pseudo: pseudo,
            email: email,
            password: password
        })
            .then((response) => {
                setCurrentUser({
                    userId: response.data.user_id,
                    token: response.data.token,
                    customerId: response.data.customer_id
                })
                return response.data
            })
            .catch((err) => {
                console.log("signup error :", err);
                setConnectionError(err.response.data.message)
            });

    }

    function trySignUp():void {
        postCreateUser()
            .then((userData) => {
                return autoLogin(userData[0].pseudo)
            })
            .then((data)=> {
                console.log("signup success", data)
                return getProfileData(data.user_id, data.token)
            })
            .then((data)=>{
                console.log("conection success, now try update user profile ctx", data)
                //@ts-ignore
                updateUserProfile({
                    dateCreated: data.created_at,
                    email: data.email,
                    pseudo: data.pseudo,
                    dateUpdate: data.updated_at,
                    //firstName: data.,
                    //lastName: data.
                })
            })
            .then(() => {
                // TODO : change destination according to global state next view
                navigation.navigate('Main')
            })
    }



    return (
        <View style={baseStyle.view}>
            <ScrollView
                style={[SignUpViewStyle.container]}
            >
                <View style={connectionStyle.container}>

                    <View style={[inputStyle.labelWrapper, connectionStyle.first]}>
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
                        placeholder={"nom"}
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
                        placeholder={"prénom"}
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
                        placeholder={"pseudo"}
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
                        placeholder={"identifiant"}
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

                    <View style={[connectionStyle.buttonWrapper]}
                    >

                        <TouchableOpacity style={[baseStyle.btn, buttonStyle.dark]}
                                          onPress={() => trySignUp()}
                        >
                            <FontAwesomeIcon icon={faUserPlus} size={30} style={mainMenuStyle.items} />
                            <Text style={[baseStyle.textTypo, baseStyle.textLight, connectionStyle.button]}>S'inscrire</Text>
                        </TouchableOpacity>


                    </View>
                </View>


            </ScrollView>

            <MainMenu navigation={navigation}  />
        </View>
    )
}

export default ConnectionView;