import {Switch, Text, View} from "react-native";
import optionStyle from "../style/optionsStyle";
import React from "react";


export default function Option ( {opt, toggle} ) {
    const option = opt.item
    //console.log("opt",opt)
    const toggleOption = toggle

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
        <View style={optionStyle.contentOptionCenter}>
            <View style={optionStyle.textContainer}>
                <Text style={{marginTop:15, marginBottom:15}}>
                    {`${option.name['fr_FR']} (${option.u_price}€${option.by_person?'/personnes':''}${getSuffix()})`}
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