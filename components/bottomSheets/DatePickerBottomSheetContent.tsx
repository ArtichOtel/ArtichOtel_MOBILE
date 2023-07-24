import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, Platform, StyleSheet } from "react-native";
import { CriteriaCtx } from "../../utils/context";
import { set } from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker'

function DatePickerBottomSheetContent(props: any): JSX.Element {
  const { criteria, setCriteria } = useContext(CriteriaCtx);
  const today = new Date()
  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(addDays(startDate, 1))

  function addDays(date : Date, days : number) {
    let newDate = new Date(date)
    newDate.setDate(newDate.getDate() + days)
    return newDate
  }

  useEffect(() => {

    if (startDate >= endDate) setEndDate(addDays(startDate, 1))

    setCriteria({
      ...criteria,
      startDate: startDate.toLocaleDateString('fr-FR'),
      endDate: endDate.toLocaleDateString('fr-FR')
    })
  }, [startDate, endDate]);

  return (
    <View>
      <Text>Arrivée</Text>
      <DateTimePicker
        value={startDate}
        mode='date'
        is24Hour={true}
        onChange={(_, selectedDate) => setStartDate(selectedDate)}
        minimumDate={today}
      />
      <Text>Départ</Text>
      <DateTimePicker
        value={endDate}
        mode='date'
        is24Hour={true}
        onChange={(_, selectedDate) => setEndDate(selectedDate)}
        minimumDate={addDays(startDate, 1)}
      />
    </View>
  );
}

export default DatePickerBottomSheetContent;
