import {Text, View, Image, TouchableOpacity, Animated, Switch, FlatList, Platform} from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import baseStyle from '../style/baseStyle';
import mainStyle from '../style/MainStyle';
import optionStyle from '../style/optionsStyle';
import buttonStyle from '../style/buttonStyle';
import axios from "axios";
// @ts-ignore
import {API_URL} from '@env';
import {CriteriaCtx} from "../utils/context";
import ScrollView = Animated.ScrollView;
import {getDiffDate} from "../utils/dates";
import optionsStyle from "../style/optionsStyle";

type OptionsViewProps = {
    navigation: any,
    route: any
}

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
    const diffDate = getDiffDate(criteria.startDate, criteria.endDate);
    console.log("searchReservationsResult in optionview",searchReservationsResult)
    const roomPrice = searchReservationsResult.price;
    const basePrice = nPers * roomPrice * diffDate

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
            console.error("error", error);
        }
    };


    function toggleOption(index: number) {
        let tempList = options.map(a=>a)
        tempList[index].enabled = !tempList[index].enabled
        setOptions(tempList)
        calculPrice(index);
    }

    // fetch table des options => setOptions(data)
    useEffect(()=> {
        if (!options) {
            fetchOptions().then()
        }
    }, [])

    // update price
    function calculPrice(index :number)
    {
        let tempListCalcul = options.map(b => b)
        if(tempListCalcul[index].name === "Wifi")
        {
            if(tempListCalcul[index].enabled)
            {
                setTotalPrice(price => price += tempListCalcul[index].u_price * (tempListCalcul[index].by_person ? nPers : 1));
            }
            else
            {
                setTotalPrice(price => price -= tempListCalcul[index].u_price * (tempListCalcul[index].by_person? nPers : 1));
            }
        }
        else if(tempListCalcul[index].name === "Télévision")
        {
            const nPeriod =  Math.ceil(DIFF_DATE/7) // 7, 1 suivant data en bdd, si 0 nPeriod = 1
            if(tempListCalcul[index].enabled)
            {

                setTotalPrice(price => price += tempListCalcul[index].u_price * (tempListCalcul[index].by_person? nPers : 1) * nPeriod)
            }
            else
            {
                setTotalPrice(price => price -= tempListCalcul[index].u_price * (tempListCalcul[index].by_person? nPers : 1) * nPeriod);
            }
        }
        else
        {
            if(tempListCalcul[index].enabled)
            {

                setTotalPrice(price => price += tempListCalcul[index].u_price * (tempListCalcul[index].by_person? nPers : 1) * DIFF_DATE)
            }
            else
            {
                setTotalPrice(price => price -= tempListCalcul[index].u_price * (tempListCalcul[index].by_person? nPers : 1) * DIFF_DATE);
            }
        }
    }





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
      <View style={optionStyle.centerContainer}>
            <View style={[optionStyle.titleBox]}>
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
                        {options?.length<5 ? null :
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
            <View style={[
                Platform.OS === 'android' ?
                optionStyle.buttonPriceAndroid : optionsStyle.buttonPrice,
                optionStyle.contentCenter]}>
                <Text style={[optionStyle.buttonTextColor, baseStyle.textTypo]}>{totalPrice} €</Text>
            </View>
            <TouchableOpacity style={[optionStyle.buttonValid]}><Text style={[optionStyle.buttonTextColor, baseStyle.textTypo]}>Réserver</Text></TouchableOpacity>
        </View>
      </View>
    );
}