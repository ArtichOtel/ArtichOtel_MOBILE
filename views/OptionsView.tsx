import { Text, View, Image, TouchableOpacity, Animated, Switch } from 'react-native';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import baseStyle from '../style/baseStyle';
import mainStyle from '../style/MainStyle';
import optionStyle from '../style/optionsStyle';
import buttonStyle from '../style/buttonStyle';
import colors from '../style/colors';
import ScrollView = Animated.ScrollView;

type roomProps = {
    navigation: any;
}
export default function OptionsView(props: roomProps): JSX.Element {
    const {navigation} = props

    const [isEnabledFullPension, setIsEnabledFullPension] = useState(false);
    const [isEnabledHalfPension, setIsEnabledHalfPension] = useState(false);
    const [isEnabledBreakfast, setIsEnabledBreakfast] = useState(false);
    const [isEnabledPressing, setIsEnabledPressing] = useState(false);
    const [isEnabledWifi, setIsEnabledWifi] = useState(false);
    const [isEnabledTele, setIsEnabledTele] = useState(false);

    const toogleSwitchFullPension = () =>setIsEnabledFullPension(!isEnabledFullPension);
    const toogleSwitchHalfPension = () =>setIsEnabledHalfPension(!isEnabledHalfPension);
    const toogleSwitchBreakfast = () =>setIsEnabledBreakfast(!isEnabledBreakfast);
    const toogleSwitchPressing = () =>setIsEnabledPressing(!isEnabledPressing);
    const toogleSwitchWifi = () =>setIsEnabledWifi(!isEnabledWifi);
    const toogleSwitchTele = () =>setIsEnabledTele(!isEnabledTele);

    const [totalPrice, setTotalPrice] = useState(70);

    function getDiffDate()
    {
        let calculDiff = new Date(2023, 6,  23).getTime() - new Date(2023, 6, 20).getTime();
        let dayDiff = Math.floor(calculDiff/(1000*3600*24));

        return dayDiff;
    }

    const DIFF_DATE = getDiffDate();

    useEffect(() => 
    {
        if(isEnabledTele)
        {
            setTotalPrice(price => price += 10 * 1);
        }
        else
        {
            setTotalPrice(price => price -= 10 * 1);
        }

    }, [isEnabledTele]);

    useEffect(() => 
    {
        if(isEnabledWifi)
        {
            setTotalPrice(price => price += 25);
        }
        else
        {
            setTotalPrice(price => price -= 25);
        }

    }, [isEnabledWifi]);

    useEffect(() => 
    {
        if(isEnabledPressing)
        {
            setTotalPrice(price => price += 30 * DIFF_DATE * 3);
        }
        else
        {
            setTotalPrice(price => price -= 30 * DIFF_DATE * 3);
        }

    }, [isEnabledPressing]);

    useEffect(() => 
    {
        if(isEnabledBreakfast)
        {
            setTotalPrice(price => price += 9 * DIFF_DATE * 3);
        }
        else
        {
            setTotalPrice(price => price -= 9 * DIFF_DATE * 3);
        }
    }, [isEnabledBreakfast]);

    useEffect(() => 
    {
        if(isEnabledHalfPension)
        {
            setTotalPrice(price => price += 20 * DIFF_DATE * 3);
        }
        else
        {
            setTotalPrice(price => price -= 20 * DIFF_DATE * 3);
        }
    }, [isEnabledHalfPension]);

    useEffect(() => 
    {
        if(isEnabledFullPension)
        {
            setTotalPrice(price => price += 35 * DIFF_DATE * 3);
            
        }
        else
        {
            setTotalPrice(price => price -= 35 * DIFF_DATE * 3);
        }
    }, [isEnabledFullPension]);

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
                        <Switch onValueChange={() => toogleSwitchFullPension()} value={isEnabledFullPension}/>
                        <Switch onValueChange={() =>toogleSwitchHalfPension()} value={isEnabledHalfPension} />
                        <Switch onValueChange={() =>toogleSwitchBreakfast ()} value={isEnabledBreakfast}/>
                        <Switch onValueChange={() => toogleSwitchPressing()} value={isEnabledPressing} />
                        <Switch onValueChange={() => toogleSwitchTele()} value={isEnabledTele} />
                        <Switch onValueChange={() => toogleSwitchWifi()} value={isEnabledWifi} />
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
            <Text style={[optionStyle.buttonPrice, optionStyle.buttonTextColor, optionStyle.contentCenter]}>{totalPrice} €</Text>
            <TouchableOpacity style={[optionStyle.buttonValid, optionStyle.contentCenter]}><Text style={optionStyle.buttonTextColor}>Réserver</Text></TouchableOpacity>
        </View>
      </View>
    );
}