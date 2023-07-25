import {Text, View, Image, TouchableOpacity, Animated, Switch, FlatList} from 'react-native';
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

type Option = {
    id: number,
    name:string,
    u_price: number,
    by_person: number,
    nb_day: number,
    enabled: boolean
}

export default function OptionsView(props: roomProps): JSX.Element {
    const {navigation} = props;

    // recap criteres
    const nPers = 3;
    const roomPrice = 70;

    // data bdd
    //Une liste de 6 objets, 1 par options. Chacun contenant les infos de la table (id, name, u_price, by_person, nb_day)
    let listOptions = [
        {id:1, name:'Demie-pension',     u_price: 20, by_person: 1, nb_day: 1, enabled:false},
        {id:2, name:'Pension complète',  u_price: 35, by_person: 1, nb_day: 1, enabled:false},
        {id:3, name:'Petit déjeuner',    u_price: 9,  by_person: 1, nb_day: 1, enabled:false},
        {id:4, name:'Service pressing',  u_price: 30, by_person: 1, nb_day: 1, enabled:false},
        {id:5, name:'Télévision',        u_price: 10, by_person: 0, nb_day: 7, enabled:false},
        {id:6, name:'Wifi',              u_price: 25, by_person: 0, nb_day: 0, enabled: false}
    ];

    const [isEnabledFullPension, setIsEnabledFullPension] = useState(false);
    const [isEnabledHalfPension, setIsEnabledHalfPension] = useState(false);
    const [isEnabledBreakfast, setIsEnabledBreakfast] = useState(false);
    const [isEnabledPressing, setIsEnabledPressing] = useState(false);
    const [isEnabledWifi, setIsEnabledWifi] = useState(false);
    const [isEnabledTele, setIsEnabledTele] = useState(false);

    const [options, setOptions] = useState<Option[]|null>(listOptions);

    const toogleSwitchFullPension = () =>setIsEnabledFullPension(!isEnabledFullPension);
    const toogleSwitchHalfPension = () =>setIsEnabledHalfPension(!isEnabledHalfPension);
    const toogleSwitchBreakfast = () =>setIsEnabledBreakfast(!isEnabledBreakfast);
    const toogleSwitchPressing = () =>setIsEnabledPressing(!isEnabledPressing);
    const toogleSwitchWifi = () =>setIsEnabledWifi(!isEnabledWifi);
    const toogleSwitchTele = () =>setIsEnabledTele(!isEnabledTele);

    const [totalPrice, setTotalPrice] = useState<number>(roomPrice);

    function getDiffDate()
    {
        let calculDiff = new Date(2023, 6,  23).getTime() - new Date(2023, 6, 20).getTime();
        let dayDiff = Math.floor(calculDiff/(1000*3600*24));

        return dayDiff;
    }
    const DIFF_DATE = getDiffDate();

    function toggleOption(index: number) {
        let tempList = options.map(a=>a)
        tempList[index].enabled = !tempList[index].enabled
        setOptions(tempList)
    }

    // fetch table des options => setOptions(data)


    useEffect(() =>
    {
        const nPeriod =  Math.ceil(DIFF_DATE/7) // 7, 1 suivant data en bdd, si 0 nPeriod = 1

        if(isEnabledTele)
        {
            setTotalPrice(price => price += 10 * nPeriod);
        }
        else
        {
            setTotalPrice(price => price -= 10 * nPeriod);
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
            setTotalPrice(price => price += 30 * DIFF_DATE * nPers);
        }
        else
        {
            setTotalPrice(price => price -= 30 * DIFF_DATE * nPers);
        }

    }, [isEnabledPressing]);

    useEffect(() => 
    {
        if(isEnabledBreakfast)
        {
            setTotalPrice(price => price += 9 * DIFF_DATE * nPers);
        }
        else
        {
            setTotalPrice(price => price -= 9 * DIFF_DATE * nPers);
        }
    }, [isEnabledBreakfast]);

    useEffect(() => 
    {
        if(isEnabledHalfPension)
        {
            setTotalPrice(price => price += 20 * DIFF_DATE * nPers);
        }
        else
        {
            setTotalPrice(price => price -= 20 * DIFF_DATE * nPers);
        }
    }, [isEnabledHalfPension]);

    useEffect(() => 
    {
        if(isEnabledFullPension) {
            setTotalPrice(price => price += 35 * DIFF_DATE * nPers)
        } else {
            setTotalPrice(price => price -= 35 * DIFF_DATE * nPers);
        }
    }, [isEnabledFullPension]);


    useEffect(() => {
        // objectif : remettre à jour le prix total
        const nPeriod =  Math.ceil(DIFF_DATE/7) // 7, 1 suivant data en bdd, si 0 nPeriod = 1

    }, [options]);




    function Option ({opt, index}) {
        console.log("opt", opt, index)
        return (
            <View style={optionStyle.contentCenter}>
                <View style={optionStyle.textContainer}>
                    <Text>{opt.name} ({opt.u_price})</Text>
                </View>

                <View style={optionStyle.switchContainer}>
                    <Switch
                        value={opt.enabled}
                        onValueChange={() => toggleOption(index)}/>
                </View>
            </View>
        )
    }



    // @ts-ignore
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

                        <FlatList data={options}
                                  renderItem={({opt, index}) => <Option opt={opt} index={index} />}
                                  //keyExtractor={(opt) => opt.id}
                        />
                        
                        
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