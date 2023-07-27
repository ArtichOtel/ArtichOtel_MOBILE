import React, {useContext, useState} from "react";
import {Alert, Animated, Text, TextInput, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { faUserPlus} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ScrollView = Animated.ScrollView;
// @ts-ignore
import {API_URL} from "@env";

import MainMenu from "../components/tabs/MainMenu";

import {userDataType, userProfileType} from "../utils/types";
import {UserCtx, UserProfileCtx} from "../utils/context";
import {getUserData} from "../utils/profileUpdater";
import {emailREGEX, lettersREGEX, pwdREGEX} from "../utils/regex";

import baseStyle from "../style/baseStyle";
import buttonStyle from "../style/buttonStyle";
import mainMenuStyle from "../style/mainMenuStyle";
import connectionStyle from "../style/ConnectionStyle";
import inputStyle from "../style/inputStyle";
import SignUpViewStyle from "../style/SignUpViewStyle";


type SignUpViewProps = {
    navigation: any,
    route: any
}

type signupError = {
    field: string,
    message: string
}


function SignUpView(props: SignUpViewProps): JSX.Element|null {
    const { navigation, route } = props

    // CONTEXTS
    const {currentUser, setCurrentUser} = useContext(UserCtx)
    const {setUserProfile} = useContext(UserProfileCtx)

    // internal states
    const [lastname, setLastname] = useState<string>('')
    const [firstname, setFirstname] = useState<string>('')
    const [pseudo, setPseudo] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [signupError, setSignupError] = useState<signupError[]>([{field:"global", message:null}])


    function nullishError(fieldName) {
        let tempErrors = signupError.map(a=>a)
        console.log("map index",tempErrors.map(err => err?.field||null).indexOf(fieldName))
        console.log("map complete before",tempErrors)

        console.log("setting error on",fieldName, "at index", tempErrors.map(err => err?.field||null).indexOf(fieldName), "=>", null )
        console.log(tempErrors[tempErrors.indexOf(fieldName)])
        tempErrors.map(err => err?.field||null).indexOf(fieldName) > -1
            ? tempErrors[tempErrors.map(err => err?.field||null).indexOf(fieldName)] = { field: fieldName, message: null }   // prepare update if exists
            : tempErrors.push({ field: fieldName, message: null })   // prepare null value is does not exists

        console.log("map complete after",tempErrors)
        setSignupError(tempErrors)
    }

  const searchReservationsResult: object = route.params
    ?.searchReservationsResult
    ? route.params.searchReservationsResult
    : null;
  const nextScreen: object = route.params?.nextScreen
    ? route.params.nextScreen
    : null;


    function inputsAreValid() {
        // TODO : create a list of inputs and map over it
        let validity = true
        let errorUpdate = []

        if (lastname !== '') {
            if (!lastname.match(lettersREGEX)) {
                errorUpdate.push({field:"lastname", message:"Que des lettres"})
                validity = false
            }
            if (lastname.length > 100) {
                errorUpdate.push({field:"lastname", message:"Nom trop long"})
                validity = false
            }
        } else {
            errorUpdate.push({field:"lastname", message: "Champ obligatoire"})
            validity = false
        }

        if (firstname !== '') {
            if (!firstname.match(lettersREGEX)) {
                errorUpdate.push({field:"firstname", message:"Que des lettres"})
                validity = false
            }
            if (firstname.length > 100) {
                errorUpdate.push({field:"firstname", message:"Prénom trop long"})
                validity = false
            }
        } else {
            errorUpdate.push({field:"firstname", message:"Champ obligatoire"})
            validity = false
        }

        if (pseudo !== '') {
            if (pseudo.length > 100) {
                errorUpdate.push({field:"pseudo", message:"Pseudo trop long"})
                validity = false
            }
        }

        if (email !== '') {
            if (!email.match(emailREGEX)) {
                errorUpdate.push({field:"email", message:"Email invalide"})
                validity = false
            }
        } else {
            errorUpdate.push({field:"email", message:"Champ obligatoire"})
            validity = false
        }

        if (password !== '') {
            if (!password.match(pwdREGEX)) {
                errorUpdate.push({field:"password", message:"8 caractères dont 1 spécial"})
                validity = false
            }
        } else {
            errorUpdate.push({field:"password", message:"Champ obligatoire"})
            validity = false
        }

        // if errors set state
        if (errorUpdate.length) {
            setSignupError(errorUpdate)
        }

        return validity
    }



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
                console.log("signup error :", err);
                let tempErrors = signupError.map(a=>a)
                tempErrors[0] = {field:"global", message:`Erreur lors de l'inscription :\n ${err}`}
                setSignupError(tempErrors)
            });
    };


    function autoLogin(pseudo:string) {
        return axios.post(API_URL+"user/login", {
            pseudo: pseudo,
            email: email,
            password: password
        })
            .then((response) => {
                const user: userDataType = {
                    userId: response.data.user_id,
                    token: response.data.token,
                    customerId: response.data.customer_id
                }
                setCurrentUser(user)
                return response.data
            })
            .catch((err) => {
                console.log("auto login error :", err);
                setSignupError(err.response.data.message)
            });
    }

    function trySignUp():void {
        console.log("try signup --------------------------------------------------------------------------")
        // check inputs
        if (inputsAreValid()) {
            postCreateUser()
                .then((userData) => {
                    return autoLogin(userData[0].pseudo)
                })
                .then((cred) => {
                    console.log("signup success", cred)
                    return getUserData({cred})
                })
                .then((data: any) => {
                    console.log("conection success, now try update user profile ctx", data)

                    const userData: userProfileType = {
                        dateCreated: data.created_at,
                        email: data.email,
                        pseudo: data.pseudo,
                        dateUpdate: data.updated_at,
                        //firstName: data.,
                        //lastName: data.
                    }

                    setUserProfile(userData)
                })
                .then(() => {
                    // TODO : change destination according to global state next view
                    console.log("route.params in Signupview", nextScreen);
                    // console.log(
                    //   "searchReservationsResult in Signupview",
                    //   searchReservationsResult
                    // );
                    nextScreen
                        ? navigation.navigate(route.params.nextScreen, {
                            searchReservationsResult: searchReservationsResult,
                        })
                        : navigation.navigate("Main");
                })
                .catch((err) => {
                    console.log("error in signupview", err);
                });
        } else {
            Alert.alert("Certains champs comportent des erreurs")
        }
    }


    return (
        !currentUser
            ? null // TODO : redirect to somewhere else
            : <View style={baseStyle.view}>
                <ScrollView style={[SignUpViewStyle.container]} >

                    <View style={connectionStyle.container}>

                        {signupError[0].message ?
                            <View style={{marginTop: 40}}>
                                <Text style={baseStyle.errorText}>{signupError[0].message}</Text>
                            </View>
                            : null}

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
                            onPressIn={() => nullishError("lastname")}
                            placeholder={"nom"}
                            value={lastname}
                        />

                        {!signupError.filter(err => err.field==="lastname")[0]?.message
                            ? null
                            : <ErrorMess message={signupError.filter(err => err.field==="lastname")[0].message} /> }

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
                            onPressIn={() => nullishError("firstname")}
                            placeholder={"prénom"}
                            value={firstname}
                        />

                        {!signupError.filter(err => err.field==="firstname")[0]?.message
                            ? null
                            : <ErrorMess message={signupError.filter(err => err.field==="firstname")[0].message} /> }

                        <View style={inputStyle.labelWrapper}>
                            <Text style={[inputStyle.label]}>Pseudo</Text>
                        </View>

                        <TextInput
                            style={[baseStyle.input, connectionStyle.input]}
                            autoComplete={"username"}
                            blurOnSubmit={true}
                            inputMode="text"
                            onChangeText={(val) => setPseudo(val)}
                            onPressIn={() => nullishError("pseudo")}
                            placeholder={"pseudo"}
                            value={pseudo}
                        />

                        {!signupError.filter(err => err.field==="pseudo")[0]?.message
                            ? null
                            : <ErrorMess message={signupError.filter(err => err.field==="pseudo")[0].message} /> }

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
                            onPressIn={() => nullishError("email")}
                            placeholder={"identifiant"}
                            value={email}
                        />

                        {!signupError.filter(err => err.field==="email")[0]?.message
                            ? null
                            : <ErrorMess message={signupError.filter(err => err.field==="email")[0].message} /> }


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
                            onPressIn={() => nullishError("password")}
                            placeholder={"mot de passe"}
                            value={password}
                        />

                        {!signupError.filter(err => err.field==="password")[0]?.message
                            ? null
                            : <ErrorMess message={signupError.filter(err => err.field==="password")[0].message} /> }

                        <View style={[connectionStyle.buttonWrapper]}>

                            <TouchableOpacity style={[baseStyle.btn, buttonStyle.dark]}
                                              onPress={() => trySignUp()}
                            >
                                <FontAwesomeIcon icon={faUserPlus} size={30} style={mainMenuStyle.items} />
                                <Text style={[baseStyle.textTypo, baseStyle.textLight, connectionStyle.button]}>S'inscrire</Text>
                            </TouchableOpacity>


                        </View>
                    </View>


                </ScrollView>

                <MainMenu navigation={navigation} />
            </View>
    )
}

export default SignUpView;

type ErrorMessProps = {
    message: string
}

function ErrorMess(props: ErrorMessProps): JSX.Element {
    return (
        <View style={{marginBottom: 20}}>
            <Text style={baseStyle.errorText}>{props.message}</Text>
        </View>
    )
}