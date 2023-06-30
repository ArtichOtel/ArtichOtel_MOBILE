import { Text, View, Image, TouchableOpacity, Animated, Switch } from 'react-native';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import baseStyle from '../style/baseStyle';
import mainStyle from '../style/MainStyle';
import optionStyle from '../style/optionsStyle';
import buttonStyle from '../style/buttonStyle';
import colors from '../style/colors';
import ScrollView = Animated.ScrollView;


export default function OptionsView(props: any): JSX.Element {

    const [isEnabledFullPension, setIsEnabledFullPension] = useState(false);
    const [isEnabledHalfPension, setIsEnabledHalfPension] = useState(false);
    const [isEnabledBreakfast, setIsEnabledBreakfast] = useState(false);
    const [isEnabledPressing, setIsEnabledPressing] = useState(false);
    const [isEnabledWifi, setIsEnabledWifi] = useState(false);
    const [isEnabledTele, setIsEnabledTele] = useState(false);

    const toogleSwitchFullPension = () =>setIsEnabledFullPension(previousState => !previousState);
    const toogleSwitchHalfPension = () =>setIsEnabledHalfPension(previousState => !previousState);
    const toogleSwitchBreakfast = () =>setIsEnabledBreakfast(previousState => !previousState);
    const toogleSwitchPressing = () =>setIsEnabledPressing(previousState => !previousState);
    const toogleSwitchWifi = () =>setIsEnabledWifi(previousState => !previousState);
    const toogleSwitchTele = () =>setIsEnabledTele(previousState => !previousState);

    return (
      <View style={baseStyle.container}>
            <View style={[baseStyle.container, optionStyle.titleBox, optionStyle.contentCenter]}>
                <Text>Vos options de Réservation</Text>
            </View>
        
            <ScrollView>
                <View style={optionStyle.recapInfoContainer}>
                    <Text style={baseStyle.textTypo}>Arrivée                                         30/06/2023</Text>
                    <View style={optionStyle.line}></View>
                    <Text style={baseStyle.textTypo}>Départ                                          01/07/2023</Text>
                    <View style={optionStyle.line}></View>
                    <Text style={baseStyle.textTypo}>Nombre de Personnes                                3</Text>
                    
                </View>

                <View style={optionStyle.line}></View>

                <View style={optionStyle.contentOptionCenter}>
                    <View style={optionStyle.textContainer}>
                        <Text style={{marginTop:15, marginBottom:15}}>Formule Pension Complète (35€/personne/jour)</Text>

                        <Text style={{marginTop:15, marginBottom:15}}>Formule Demie Pension (20€/personne/jour)</Text>

                        <Text style={{marginTop:15, marginBottom:15}}>Formule Petit Déjeuner (9€/personne/jour)</Text>

                        <Text style={{marginTop:15, marginBottom:15}}>Service Pressing (30€/personne/jour)</Text>

                        <Text style={{marginTop:15, marginBottom:15}}>Télévision (10€/semaine)</Text>

                        <Text style={{marginTop:15, marginBottom:15}}>Wifi (25€)</Text>
                        
                    </View>

                    <View style={optionStyle.switchContainer}>
                        <Switch onValueChange={toogleSwitchFullPension} value={isEnabledFullPension}/>
                        <Switch onValueChange={toogleSwitchHalfPension} value={isEnabledHalfPension} />
                        <Switch onValueChange={toogleSwitchBreakfast} value={isEnabledBreakfast} />
                        <Switch onValueChange={toogleSwitchPressing} value={isEnabledPressing} />
                        <Switch onValueChange={toogleSwitchWifi} value={isEnabledWifi} />
                        <Switch onValueChange={toogleSwitchTele} value={isEnabledTele} />
                    </View>

                </View>

                <View style={optionStyle.line}></View>
                <View style={optionStyle.cbContainer}>
                    <FontAwesomeIcon icon={faCreditCard} size={40} />
                    <TouchableOpacity style={[baseStyle.btn, mainStyle.alignBtn, buttonStyle.light, {width: 275}]}>
                        <Text>Numéro Carte Bancaire</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        

        <View style={[optionStyle.buttonBackgroundContainer, optionStyle.contentCenter]}>
            <TouchableOpacity style={[optionStyle.buttonPrice, optionStyle.contentCenter]}><Text style={optionStyle.buttonTextColor}>200€</Text></TouchableOpacity>
            <TouchableOpacity style={[optionStyle.buttonValid, optionStyle.contentCenter]}><Text style={optionStyle.buttonTextColor}>Réserver</Text></TouchableOpacity>
        </View>
      </View>
    );
}