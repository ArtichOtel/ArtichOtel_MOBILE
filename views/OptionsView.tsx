import {Animated, FlatList, Switch, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCreditCard} from '@fortawesome/free-solid-svg-icons';
import baseStyle from '../style/baseStyle';
import mainStyle from '../style/MainStyle';
import optionStyle from '../style/optionsStyle';
import buttonStyle from '../style/buttonStyle';
import axios from "axios";
// @ts-ignore
import {API_URL} from '@env';
import {CriteriaCtx} from "../utils/context";
import ScrollView = Animated.ScrollView;

type OptionsViewProps = {
    navigation: any;
    route: any;
};

type Option = {
    id: number,
    name:string,
    u_price: number,
    by_person: number,
    nb_day: number,
    enabled: boolean
}

export default function OptionsView(props: OptionsViewProps): JSX.Element {
    const { navigation, route } = props;
    const { criteria } = React.useContext(CriteriaCtx);
    const searchReservationsResult = route.params.searchReservationsResult;

    // recap criteria
    const nPers = criteria.peopleNbr;
    const roomPrice = searchReservationsResult.price;
    const basePrice = nPers * roomPrice

    const [options, setOptions] = useState<Option[]|null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(basePrice);

    // fetch options
    const fetchOptions = async () => {
        try {
            const response = await axios.get(API_URL + "optional-services");
            const optionsList = response.data;
            //console.log("fetchOptions", optionsList);
            setOptions(optionsList);
        } catch (error) {
            console.error(error);
        }
    };

    function getDiffDate()
    {
        let calculDiff = new Date(2023, 6,  23).getTime() - new Date(2023, 6, 20).getTime();
        return Math.floor(calculDiff / (1000 * 3600 * 24));
    }
    const DIFF_DATE = getDiffDate();

    function toggleOption(index: number) {
        let tempList = options.map(a=>a)
        tempList[index].enabled = !tempList[index].enabled
        setOptions(tempList)
    }

    // fetch table des options => setOptions(data)
    useEffect(()=> {
        fetchOptions().then()
    }, [])


    useEffect(() => {
        // objectif : remettre à jour le prix total
        const nPeriod =  Math.ceil(DIFF_DATE/7) // 7, 1 suivant data en bdd, si 0 nPeriod = 1

    }, [options]);




    function Option ( {opt} ) {
        const option = opt.item

        function getSuffix() {
            switch (option.nb_day) {
                case 0:
                    return ''
                case 1:
                    return '/jour'
                case 7:
                    return '/semaine'
                default:
                    return ''
            }
        }

        return (
            <View style={optionStyle.contentCenter}>
                <View style={optionStyle.textContainer}>
                    <Text style={{marginTop:15, marginBottom:15}}>
                        {`${option.name} (${option.u_price}€${option.by_person?'/personnes':''}${getSuffix()})`}
                    </Text>
                </View>

                <View style={optionStyle.switchContainer}>
                    <Switch
                        value={option.enabled}
                        onValueChange={() => toggleOption(opt.index)}/>
                </View>
            </View>
        )
    }


    return (
      <View style={baseStyle.container}>
            <View style={[baseStyle.container, optionStyle.titleBox, optionStyle.contentCenter]}>
                <Text>Vos options de Réservation</Text>
            </View>
        
            <ScrollView>
                <View style={optionStyle.recapInfoContainer}>
                    <View>
                        <Text style={baseStyle.textTypo}>Arrivée</Text>
                        <Text style={baseStyle.textTypo}>{criteria.startDate.toDateString()}</Text>
                        <View style={optionStyle.line}/>
                    </View>

                    <View>
                        <Text style={baseStyle.textTypo}>Départ</Text>
                        <Text style={baseStyle.textTypo}>{criteria.endDate.toDateString()}</Text>
                        <View style={optionStyle.line}/>
                    </View>

                    <View>
                        <Text style={baseStyle.textTypo}>Nombre de Personnes</Text>
                        <Text style={baseStyle.textTypo}>{nPers}</Text>
                    </View>
                    
                </View>

                <View style={optionStyle.line}/>

                <View style={optionStyle.contentOptionCenter}>
                    <View style={optionStyle.textContainer}>
                        {options.length<5 ? null :
                            <FlatList data={options}
                                      renderItem={ (opt) => <Option opt={opt} />}
                            />
                        }
                    </View>


                </View>

                <View style={optionStyle.line}/>
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