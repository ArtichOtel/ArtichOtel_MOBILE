import React, { useContext, useState, useEffect } from "react";
import {Alert, Text, TextInput, TouchableOpacity, View} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRightToBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
// @ts-ignore
import {API_URL} from "@env";

import MainMenu from "../components/tabs/MainMenu";

import { credentials, userProfileType } from "../utils/types";
import { UserCtx, UserProfileCtx } from "../utils/context";
import {getUserData, getCustomerData } from "../utils/profileUpdater";

import baseStyle from "../style/baseStyle";
import buttonStyle from "../style/buttonStyle";
import mainMenuStyle from "../style/mainMenuStyle";
import connectionStyle from "../style/ConnectionStyle";
import inputStyle from "../style/inputStyle";



type ConnectionProps = {
    navigation: any,
    route: any
}


function ConnectionView(props: ConnectionProps): JSX.Element {
    const {navigation, route} = props

    // CONTEXTS
    const {currentUser, setCurrentUser} = useContext(UserCtx)
    const {userProfile, setUserProfile} = useContext(UserProfileCtx)

    // internal states
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [connectionError, setConnectionError] = useState<string|null>(null)

    // navigation flow
    const searchReservationsResult: object = route.params?.searchReservationsResult ? route.params.searchReservationsResult : null
    const nextScreen:object = route.params?.nextScreen ? route.params.nextScreen : null
    //console.log('route.params in connectionview', route.params);
    //console.log('searchReservationsResult in connectionview', searchReservationsResult);


  const getUserAccess = async () => {
        return await axios
            .post(API_URL + "user/login", {
                pseudo: username,
                email: username,
                password: password,
            })
            .then((response) => {
                console.log("getUserAccess", response.data);
                return response.data;
            })
            .then((userData) => {
                //console.log("recap")
                //console.log(userData.user_id,userData.token,userData.customer_id)
                setCurrentUser({
                    user_id: userData.user_id,
                    token: userData.token,
                    customerId: userData.customer_id
                })
                setPassword("");
                setUsername("");

                let customer = null
                if (userData.customer_id) {
                    customer = userData.customer_id
                }

        return {
          user_id: userData.user_id,
          role: userData.role,
          token: userData.token,
          customer: customer,
        };
      })
      .catch((err) => {
        console.log("connection error :", err);
        setConnectionError(err.response.data.message);
      });
  };

  function tryConnection(): void {
      let userData: userProfileType = {
          dateCreated: null,
          email: null,
          pseudo: null,
          dateUpdate: null,
          //firstName: null,
          // lastName: null
          };

        getUserAccess()
            .then((cred: credentials) => {
                console.log("connection success");
                return cred;
            })
            .then((cred: credentials) => {
                return getUserData({ cred });
            })
            .then(({ data, cred }) => {
                userData.dateCreated = data.created_at;
                userData.email = data.email;
                userData.pseudo = data.pseudo;
                userData.dateUpdate = data.updated_at;
                return { data, cred }
            })
            .then(({ data, cred }) => {
                //if (cred.role==='customer') { // 2 for customer
                    //return getCustomerData({cred})
                //}
                setUserProfile(userData)
                return { data, cred }
            })
            /*.then(({data, cred})=>{
                if (cred.role==='customer') { // 2 for customer
                    userData.firstName = data.first_name
                    userData.lastName = data.last_name
                }
                setUserProfile(userData)
            })*/
            .then(({ data, cred}) => {
                //console.log(`navigate from connection to ${nextScreen ? {nextScreen?.toString(), searchReservationsResult.toString()} : 'main'}`)
                console.log(data)
                Alert.alert(`Vous êtes connecté en tant que ${data.pseudo}`)
               nextScreen
                   ? navigation.navigate(route.params.nextScreen, {searchReservationsResult: route.params.searchReservationsResult})
                   : navigation.navigate('Main')
                }
            )
            .catch(err => {
                console.log("connection error",err)
            })
    }


    return (
        //!currentUser ? null :
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