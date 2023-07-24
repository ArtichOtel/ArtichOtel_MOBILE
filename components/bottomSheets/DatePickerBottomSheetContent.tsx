import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, Platform, StyleSheet } from "react-native";
import { CriteriaCtx } from "../../utils/context";
import { set } from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker'
import DatesBottomSheetStyle from '../../style/DatesBottomSheetStyle';
import { formatISO } from 'date-fns'

function DatePickerBottomSheetContent(props: any): JSX.Element {
  const { criteria, setCriteria } = useContext(CriteriaCtx);
  const today = new Date()
  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(addDays(today, 1))

  function addDays(date : Date, days : number) {
    let newDate = new Date(date)
    newDate.setDate(newDate.getDate() + days)
    return newDate
  }

  useEffect(() => {

    if (startDate >= endDate) setEndDate(addDays(startDate, 1))

    setCriteria({
      ...criteria,
      startDate: formatISO(startDate, { representation: 'date' }),
      endDate: formatISO(endDate, { representation: 'date' })
    })
  }, [startDate, endDate]);

  return (
    <>
      <Text style={DatesBottomSheetStyle.textTitle}>Choisissez vos dates</Text>
      <View style={DatesBottomSheetStyle.container}>
        <View style={DatesBottomSheetStyle.dateContainer}>
          <Text style={DatesBottomSheetStyle.dateTitle}>Arrivée</Text>
          <DateTimePicker
            value={startDate}
            mode='date'
            is24Hour={true}
            onChange={(_, selectedDate) => setStartDate(selectedDate)}
            minimumDate={today}
          />
        </View>
        <View style={DatesBottomSheetStyle.dateContainer}>
          <Text style={DatesBottomSheetStyle.dateTitle}>Départ</Text>
          <DateTimePicker
            value={endDate}
            mode='date'
            is24Hour={true}
            onChange={(_, selectedDate) => setEndDate(selectedDate)}
            minimumDate={addDays(startDate, 1)}
          />
        </View>
      </View>
    </>
  );
}

export default DatePickerBottomSheetContent;
