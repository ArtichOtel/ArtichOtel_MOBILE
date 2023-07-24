import React, {useContext, useState, useEffect} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import connectionStyle from "../style/ConnectionStyle";
import inputStyle from "../style/inputStyle";
import MainMenu from "../components/tabs/MainMenu";
import baseStyle from "../style/baseStyle";
import buttonStyle from "../style/buttonStyle";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowRightToBracket, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import mainMenuStyle from "../style/mainMenuStyle";
import {getCustomerData, getUserData} from "../utils/profileUpdater";
import axios from "axios";
// @ts-ignore
import {API_URL} from "@env";
import {credentials, userProfileType} from "../utils/types";
import {UserCtx, UserProfileCtx} from "../utils/context";


type ConnectionProps = {
    navigation: any;
}


function ConnectionView(props: ConnectionProps): JSX.Element {
    const {navigation} = props
    //const {userAccess, setUserAccess} = useState<{id:string, token:string}>({id:null, token:null})
    const {currentUser, setCurrentUser} = useContext(UserCtx)
    const {userProfile, setUserProfile} = useContext(UserProfileCtx)
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
                console.log("getUserAccess",response.data)

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

                let customer = null
                if (userData.customer_id) {
                    customer = userData.customer_id
                }

                return {id:userData.user_id, role:userData.role, token:userData.token, customer: customer}
            })
            .catch((err) => {
                console.log("connection error :", err);
                setConnectionError(err.response.data.message)
            });
    };


    function tryConnection():void {
        let userData: userProfileType = {
            dateCreated: null,
            email: null,
            pseudo: null,
            dateUpdate: null,
            firstName: null,
            lastName: null
        }

        getUserAccess()
            .then((cred:credentials) => {
                console.log("connection success")
                return cred
            })
            .then((cred:credentials) => {
                return getUserData({cred})
            })
            .then(({data, cred}) => {
                userData.dateCreated = data.created_at;
                userData.email = data.email;
                userData.pseudo = data.pseudo;
                userData.dateUpdate = data.updated_at;
                return {data, cred}
            })
            .then(({data, cred}) => {
                if (cred.role==='customer') { // 2 for customer
                    return getCustomerData({cred})
                }
                setUserProfile(userData)
            })
            .then(({data, cred})=>{
                if (cred.role==='customer') { // 2 for customer
                    userData.firstName = data.first_name
                    userData.lastName = data.last_name
                }
                setUserProfile(userData)
            })
            .then(() => {
                // TODO : change destination according to global state next view
                navigation.navigate('Main')
            })
    }


    return (
        !currentUser ? null :
        <View style={baseStyle.view}>
            <View style={[connectionStyle.container]}>

                {connectionError ?
                    <View style={{marginBottom: 20}}>
                        <Text style={baseStyle.errorText}>{connectionError}</Text>
                    </View>
                    : null}


                <View style={[inputStyle.labelWrapper, connectionStyle.first]}>
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


                    <TouchableOpacity style={[baseStyle.btn, buttonStyle.dark]}
                                      onPress={() => navigation.navigate('SignUp')}
                    >
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