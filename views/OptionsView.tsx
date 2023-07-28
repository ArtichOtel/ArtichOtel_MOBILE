import {
    Alert,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated,
    Switch,
    FlatList,
    Platform,
    TextInput
} from 'react-native';
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
import {CriteriaCtx, BookingCtx, UserCtx} from "../utils/context";
import ScrollView = Animated.ScrollView;
import {getDiffDate} from "../utils/dates";
import Option from "../components/option";
import {setDayWithOptions} from "date-fns/fp";
import connectionStyle from "../style/ConnectionStyle";

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
    const { booking } = React.useContext(BookingCtx);
    const { user } = React.useContext(UserCtx)
    const searchReservationsResult = route.params.searchReservationsResult;

    // recap criteria
    const nPers = criteria.peopleNbr;
    const diffDate = getDiffDate(criteria.startDate, criteria.endDate);
    //console.log("searchReservationsResult in optionview",searchReservationsResult)
    const roomPrice = searchReservationsResult.price;
    const basePrice = nPers * roomPrice * diffDate;

    const [options, setOptions] = useState<Option[]|null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(basePrice);
    const [numCB, setNumCB] = useState<string>('');

    // fetch options
    const fetchOptions = async () => {
        try {
            const response = await axios.get(API_URL + "optional-services");
            const optionsList = response.data;
            console.log("fetchOptions", optionsList);
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

    let nPeriod : number;
    // update price
    function calculPrice(index :number)
    {
        let tempListCalcul = options.map(b => b)
        switch(tempListCalcul[index].nb_day)
        {
            case 0:
                nPeriod =  0;
                switch(tempListCalcul[index].by_person)
                {
                    case 0:
                        if(tempListCalcul[index].enabled)
                        {
                            setTotalPrice(price => price += tempListCalcul[index].u_price);
                        }
                        else
                        {
                            setTotalPrice(price => price -= tempListCalcul[index].u_price);
                        }
                        break;
                    case 1:
                        if(tempListCalcul[index].enabled)
                        {
                            setTotalPrice(price => price += tempListCalcul[index].u_price * nPers);
                        }
                        else
                        {
                            setTotalPrice(price => price -= tempListCalcul[index].u_price * nPers);
                        }
                        break;
                    default:
                        break;
                }
                break;
            case 1:
                switch(tempListCalcul[index].by_person)
                {
                    case 0:
                        if(tempListCalcul[index].enabled)
                        {
                            setTotalPrice(price => price += tempListCalcul[index].u_price * diffDate);
                        }
                        else
                        {
                            setTotalPrice(price => price -= tempListCalcul[index].u_price * diffDate);
                        }
                        break;
                    case 1:
                        if(tempListCalcul[index].enabled)
                        {
                            setTotalPrice(price => price += tempListCalcul[index].u_price * nPers * diffDate);
                        }
                        else
                        {
                            setTotalPrice(price => price -= tempListCalcul[index].u_price * nPers * diffDate);
                        }
                        break;
                    default:
                        break;
                }
                break;
            case 7:
                nPeriod =  Math.ceil(diffDate/7)
                switch(tempListCalcul[index].by_person)
                {
                    case 0:
                        if(tempListCalcul[index].enabled)
                        {
                            setTotalPrice(price => price += tempListCalcul[index].u_price * nPeriod);
                        }
                        else
                        {
                            setTotalPrice(price => price -= tempListCalcul[index].u_price * nPeriod);
                        }
                        break;
                    case 1:
                        if(tempListCalcul[index].enabled)
                        {
                            setTotalPrice(price => price += tempListCalcul[index].u_price * nPers * nPeriod);
                        }
                        else
                        {
                            setTotalPrice(price => price -= tempListCalcul[index].u_price * nPers * nPeriod);
                        }
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    //Check num CB
    function filterNum(num) {
        setNumCB(num.replace(/[^0-9]/g, ""));
    }

    //Exemple
    function updateBooking() {
        if (numCB.length !== 16) {
            alert("Veuillez fournir votre numéro de CB");
        } else {
            // confirm booking with options and bank card
            const payload = {
                status: "confirmed",
                optional_services_id: options.map((opt) => {
                    opt.id
                }),
                bankCard: numCB,
            };

            axios
                .put(
                    API_URL+"booking/"+ booking.booking_id,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                )
                .then((resp) => {
                    console.log("change Status : ", resp.data);
                    Alert.alert("Votre réservation est enregistrée !!")
                    navigationFlow();
                })
                .catch((e) => console.log("Erreur : ", e));
        }
    }

    function navigationFlow() {
        //console.log("navigationFlow, currentUser", currentUser);
        navigation.navigate("Main");
    }


    return (
      <View style={optionStyle.centerContainer}>
            <View style={[optionStyle.titleBox]}>
                <Text>Vos options de Réservation</Text>
            </View>
        
            <ScrollView>
                <View style={optionStyle.recapInfoContainer}>
                    <View style={optionStyle.infoContainer}>
                        <Text style={baseStyle.textTypo}>Date d'Arrivée - </Text>
                        <Text style={baseStyle.textTypo}>{criteria.startDate.toDateString()}</Text>

                    </View>

                    <View style={optionStyle.line}/>

                    <View style={optionStyle.infoContainer}>
                        <Text style={baseStyle.textTypo}>Date de Départ - </Text>
                        <Text style={baseStyle.textTypo}>{criteria.endDate.toDateString()}</Text>
                    </View>

                    <View style={optionStyle.line}/>

                    <View style={optionStyle.infoContainer}>
                        <Text style={baseStyle.textTypo}>Nombre de Personnes - </Text>
                        <Text style={baseStyle.textTypo}>{nPers}</Text>
                    </View>
                    
                </View>

                <View style={optionStyle.line}/>

                <View style={optionStyle.contentOptionCenter}>
                    <View style={optionStyle.textContainer}>

                        {!options ? null :
                            <FlatList data={options}
                                      renderItem={ (opt) => <Option opt={opt} toggle={toggleOption}/>}
                            />
                        }
                    </View>
                </View>

                <View style={optionStyle.lineBeforeCB}/>
                <View style={optionStyle.cbContainer}>
                    <FontAwesomeIcon icon={faCreditCard} size={40} />
                    <Text>Numéro Carte Bancaire</Text>
                    <TextInput
                        style={[baseStyle.btn, mainStyle.alignBtn, buttonStyle.light, {width: 275}]}
                        blurOnSubmit={true}
                        inputMode="text"
                        onChangeText={(val) => filterNum(val)}
                        //onPressIn={() => setConnectionError(null)}
                        placeholder={"0000 0000 0000 0000"}
                        value={numCB}
                    />
                </View>
            </ScrollView>

        

        <View style={[optionStyle.buttonBackgroundContainer, optionStyle.contentCenter]}>
            <View style={[
                Platform.OS === 'android' ?
                optionStyle.buttonPriceAndroid : optionStyle.buttonPrice,
                optionStyle.contentCenter]}>
                <Text style={[optionStyle.buttonTextColor, baseStyle.textTypo]}>{totalPrice} €</Text>
            </View>
            <TouchableOpacity style={[optionStyle.buttonValid]}
                onPress={updateBooking}>
                <Text style={[optionStyle.buttonTextColor, baseStyle.textTypo]}>Réserver</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
}