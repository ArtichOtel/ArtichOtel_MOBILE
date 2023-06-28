import {TextInput} from "react-native";
import inputStyle from "../inputStyle"
import {useState} from "react";

type InputProps = {
    placeholder: string;
}


export function Input(props: any): JSX.Element {
    const {placeholder} = props

    return (
        <TextInput
            style={inputStyle.input}
            //onChangeText={onChangeNumber}
            //value={number}
            placeholder={placeholder}
            keyboardType="numeric"
        />
    )
}