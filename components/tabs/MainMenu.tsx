import {Alert, Platform, Text, TouchableHighlight, View} from 'react-native';
import baseStyle from '../../style/baseStyle';
import mainMenuStyle from "../../style/mainMenuStyle";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBed, faUser, faSuitcase, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import React, {useContext, useEffect, useState} from "react";
import {userDataType} from "../../utils/types";
import { UserCtx } from '../../utils/context';

export default function MainMenu({navigation}): JSX.Element {
    const {currentUser} = useContext(UserCtx)
    const [isLogged, setIsLogged] = useState<boolean>(false)

    const containerHeight = Platform.OS === 'ios'
        ? mainMenuStyle.containerHeightIOS
        : mainMenuStyle.containerHeightAndroid

    useEffect(()=> {
        console.log("main menu currenuser update :", currentUser.userId)
        setIsLogged(currentUser.userId !== null)
    }, [currentUser.userId, UserCtx])


    return ( !UserCtx ? null :
        <View style={[mainMenuStyle.container, containerHeight]}>
            <TouchableHighlight onPress={() => navigation.navigate('Main')}>
                <View style={{alignItems: "center"}}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size={30} style={mainMenuStyle.items} />
                    <Text style={[baseStyle.textLight]}>Rechercher</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => {
                // navigation.navigate('Room')
                Alert.alert('Not implemented yet', 'Here will be the reservations history')
            }}>
                <View style={{alignItems: "center"}}>
                    <FontAwesomeIcon icon={faSuitcase} size={30} style={mainMenuStyle.items} />
                    <Text style={[baseStyle.textLight]}>Réservation</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => {
                isLogged
                    ? navigation.navigate('Profile')
                    : navigation.navigate('Connection')
            }}>
                <View style={{alignItems: "center"}}>
                    <FontAwesomeIcon icon={faUser} size={30} style={mainMenuStyle.items} />
                    <Text style={[baseStyle.textLight]}>{ isLogged ? 'Mon compte' : 'Se connecter' }</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}